import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/content/posts');
const SOURCES_FILE = join(ROOT, 'scripts/book-cover-sources.json');
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const FORCE = process.argv.includes('--force');
const MANUAL_COVERS = {
  '오늘 밤, 세계에서 이 사랑이 사라진다 해도': 'https://s.turbifycdn.com/aah/hanbook/even-if-this-love-disappears-tonight-29.jpg',
  '죽음에 관하여': 'https://image.aladin.co.kr/product/2250/14/cover500/8996885169_1.jpg',
  '차트의 기술': 'https://image.yes24.com/goods/8980635/XL',
  '지금 당장 포르쉐를 타라': 'https://image.yes24.com/goods/116873960/XL',
  '프리즘': 'https://image.aladin.co.kr/product/35899/83/cover500/e932635671_1.jpg',
  '멍청해지기 전에 읽는 뇌과학': 'https://image.yes24.com/goods/173263967/XL',
  '지적 대화를 위한 넓고 얕은 지식 1': 'https://image.yes24.com/goods/84659792/XL',
  '챗GPT 기회를 잡는 사람들': 'https://neuralworks.io/assets/images/gpt.jpeg',
  '미라클 모닝': 'https://image.aladin.co.kr/product/27615/68/cover500/k932733027_1.jpg',
  '더 테라피스트': 'https://image.aladin.co.kr/product/28590/87/cover500/e682539403_1.jpg',
};

function attr(node, name) {
  return (node.attrs ?? []).find((item) => item.name === name)?.value;
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
}

function normalize(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\(\d+회독\)/g, '')
    .replace(/\s+1\s+2$/g, '')
    .replace(/[^0-9A-Za-z가-힣]/g, '')
    .toLocaleLowerCase();
}

function decodeSearchImage(url) {
  try {
    const parsed = new URL(url);
    const original = parsed.searchParams.get('src');
    if (!original) return { original: url, proxy: url };
    parsed.searchParams.set('type', 'fff800_800_ar');
    return { original, proxy: parsed.toString() };
  } catch {
    return { original: url, proxy: url };
  }
}

function imageCandidates(html, book) {
  const document = parse(html);
  const candidates = [];
  const title = normalize(book.title);
  const author = normalize(book.author?.split(/,| 외/u)[0] ?? '');

  walk(document, (node) => {
    if (node.tagName !== 'img') return;
    const source = attr(node, 'data-lazy-src') || attr(node, 'src');
    if (!source || !/^https?:/u.test(source)) return;
    const alt = attr(node, 'alt') ?? '';
    const normalizedAlt = normalize(alt);
    const decoded = decodeSearchImage(source);
    if (/\.ico(?:$|\?)/iu.test(decoded.original) || /logo|favicon|profile/iu.test(decoded.original)) return;

    let score = 0;
    if (title && normalizedAlt.includes(title)) score += 140;
    if (author.length >= 2 && normalizedAlt.includes(author)) score += 55;
    if (/image\.aladin\.co\.kr|image\.yes24\.com|contents\.kyobobook\.co\.kr|shopping-phinf\.pstatic\.net/iu.test(decoded.original)) score += 30;
    if (/image\.aladin\.co\.kr.+cover500/iu.test(decoded.original)) score += 180;
    if (/cover500|\/XL(?:[./?]|$)|\/pdt\//iu.test(decoded.original)) score += 25;
    if (/책|도서|이미지/u.test(alt)) score += 10;
    if (score < 30) return;
    candidates.push({ ...decoded, alt, score });
  });

  return candidates
    .sort((left, right) => right.score - left.score)
    .filter((candidate, index, all) => all.findIndex((item) => item.original === candidate.original) === index);
}

function parseString(frontmatter, key) {
  const encoded = frontmatter.match(new RegExp(`^${key}: (.+)$`, 'm'))?.[1];
  if (!encoded) return undefined;
  try {
    return JSON.parse(encoded);
  } catch {
    return encoded;
  }
}

function readBook(filename, source) {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (!/^category: Books$/m.test(frontmatter)) return undefined;
  const cover = frontmatter.match(/^cover:\s*(.+)$/m)?.[1]?.trim();
  if (!cover) return undefined;
  return {
    filename,
    title: parseString(frontmatter, 'title'),
    author: frontmatter.match(/^\s+author:\s*(.+)$/m)?.[1]?.replace(/^"|"$/g, ''),
    isbn: frontmatter.match(/^\s+isbn:\s*"?([^"\n]+)"?$/m)?.[1],
    cover,
  };
}

async function fetchWithRetry(url, attempts = 5) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const response = await fetch(url, {
      headers: { 'user-agent': USER_AGENT, referer: 'https://search.naver.com/' },
    });
    if (response.ok) return response;
    if (![403, 429].includes(response.status) && response.status < 500) return response;
    await sleep((attempt + 1) * (response.status === 403 ? 4000 : 1400));
  }
  return undefined;
}

async function downloadCandidate(candidate, destination) {
  for (const url of [candidate.original, candidate.proxy]) {
    const response = await fetchWithRetry(url, 3);
    if (!response?.ok) continue;
    const input = Buffer.from(await response.arrayBuffer());
    try {
      const metadata = await sharp(input).metadata();
      if (!metadata.width || !metadata.height) continue;
      const ratio = metadata.height / metadata.width;
      if (metadata.width < 220 || metadata.height < 300 || ratio < 1.08 || ratio > 1.9) continue;
      await mkdir(dirname(destination), { recursive: true });
      await sharp(input)
        .rotate()
        .resize({ width: 900, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 91 })
        .toFile(destination);
      return { url: candidate.original, width: metadata.width, height: metadata.height, alt: candidate.alt };
    } catch {
      // Try the next candidate.
    }
  }
  return undefined;
}

async function loadSources() {
  try {
    return JSON.parse(await readFile(SOURCES_FILE, 'utf8'));
  } catch {
    return {};
  }
}

const books = [];
for (const filename of await readdir(POSTS_DIR)) {
  if (!filename.startsWith('naver-') || !filename.endsWith('.md')) continue;
  const source = await readFile(join(POSTS_DIR, filename), 'utf8');
  const book = readBook(filename, source);
  if (book) books.push(book);
}

const sources = await loadSources();
let updated = 0;
const failed = [];
for (let index = 0; index < books.length; index += 1) {
  const book = books[index];
  if (sources[book.filename] && !MANUAL_COVERS[book.title] && !FORCE) {
    updated += 1;
    console.log(`[${index + 1}/${books.length}] ${book.title} — 기존 고해상도 표지 유지`);
    continue;
  }

  const queries = [book.isbn, `${book.title} ${book.author ?? ''} 책 표지`].filter(Boolean);
  let result;
  let searchUrl;
  const manualCover = MANUAL_COVERS[book.title];
  if (manualCover) {
    result = await downloadCandidate(
      { original: manualCover, proxy: manualCover, alt: `${book.title} | ${book.author ?? ''}`, score: 999 },
      join(ROOT, 'public', book.cover.replace(/^\//, '')),
    );
    searchUrl = manualCover;
  }
  for (const query of queries) {
    if (result) break;
    searchUrl = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(query)}`;
    const response = await fetchWithRetry(searchUrl);
    if (!response?.ok) continue;
    const candidates = imageCandidates(await response.text(), book);
    for (const candidate of candidates.slice(0, 8)) {
      result = await downloadCandidate(candidate, join(ROOT, 'public', book.cover.replace(/^\//, '')));
      if (result) break;
    }
    if (result) break;
    await sleep(420);
  }

  if (result) {
    updated += 1;
    sources[book.filename] = { title: book.title, isbn: book.isbn, searchUrl, ...result };
    await writeFile(SOURCES_FILE, `${JSON.stringify(sources, null, 2)}\n`);
    console.log(`[${index + 1}/${books.length}] ${book.title} — ${result.width}×${result.height}`);
  } else {
    failed.push({ title: book.title, reason: '적합한 고해상도 표지를 찾지 못함', searchUrl });
    console.warn(`[${index + 1}/${books.length}] ${book.title} — 실패`);
  }
  await sleep(420);
}

console.log(JSON.stringify({ books: books.length, updated, failed }, null, 2));
