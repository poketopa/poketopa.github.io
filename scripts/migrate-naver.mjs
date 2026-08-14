import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import sharp from 'sharp';

const BLOG_ID = 'lhs5427ll';
const BLOG_ORIGIN = 'https://blog.naver.com';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/content/posts');
const COVERS_DIR = join(ROOT, 'public/covers/naver');
const IMAGES_DIR = join(ROOT, 'public/images/naver');
const CACHE_FILE = join(ROOT, 'scripts/naver-book-metadata.json');
const REVIEW_FILE = join(ROOT, 'scripts/naver-book-review.json');
const WRITE = process.argv.includes('--write');
const REFRESH_METADATA = process.argv.includes('--refresh-metadata');
const METADATA_VERSION = 3;
const USER_AGENT = 'ludens.dev migration (https://poketopa.github.io/)';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BOOK_OVERRIDES = {
  '함께 자라기': { author: '김창준', pageCount: 228 },
  '두 사람의 인터내셔널': { author: '김기태' },
  '미움받을 용기': { author: '기시미 이치로, 고가 후미타케' },
  '앨저넌에게 꽃을': { author: '대니얼 키스' },
  '1만 시간의 재발견': { author: '안데르스 에릭슨, 로버트 풀' },
  '멍청해지기 전에 읽는 뇌과학': { author: '이인아', pageCount: 264 },
  '호모 루덴스': { author: '요한 하위징아' },
  '너의 췌장을 먹고 싶어': { author: '스미노 요루' },
  '대도시의 사랑법': { author: '박상영' },
  '트렌드 코리아 2026': { author: '김난도 외' },
  '제노사이드': { author: '다카노 가즈아키' },
  '결핍은 우리를 어떻게 변화시키는가': { author: '센딜 멀레이너선, 엘다 샤퍼' },
  '몰입의 즐거움': { author: '미하이 칙센트미하이' },
  '세계 경제 지각 변동': { author: '박종훈' },
  '자기 개발의 정석': { author: '임성순' },
  '트랜드 코리아 2025': { author: '김난도 외', pageCount: 400 },
  '세이노의 가르침': { author: '세이노', pageCount: 736 },
  '모순': { author: '양귀자', pageCount: 308 },
  '구의 증명 (2회독)': { author: '최진영', pageCount: 192 },
  '구의 증명': { author: '최진영', pageCount: 192 },
  '미라클 모닝': { author: '할 엘로드', isbn: null },
  '브람스를 좋아하세요...': { author: '프랑수아즈 사강', pageCount: 200, isbn: '9788937461798' },
  '날개': { author: '이상', pageCount: null, isbn: null },
  '챗GPT 기회를 잡는 사람들': { author: '장민', pageCount: 268 },
  '환상서점': { author: '소서림', pageCount: 312 },
  '인스타 브레인': { author: '안데르스 한센', pageCount: 296 },
  '마흔에 읽는 니체': { author: '장재형' },
  '이어령의 마지막 수업': { author: '이어령, 김지수', pageCount: 320 },
  '레버리지': { author: '롭 무어' },
  '프리즘': { author: '손원평', pageCount: 208, isbn: null },
  '인플레이션': { author: '하노 벡, 우르반 바허, 마르코 헤르만', pageCount: null, isbn: null },
  '죽음의 수용소에서': { author: '빅터 프랭클', pageCount: null, isbn: null },
  '날씨의 아이': { author: '신카이 마코토', pageCount: 352, isbn: null },
  '너의 이름은': { author: '신카이 마코토', pageCount: 296 },
  '지구 끝의 온실': { author: '김초엽' },
  '12가지 인생의 법칙': { author: '조던 B. 피터슨' },
  '죽음에 관하여': { author: '시니, 혀노', pageCount: null, isbn: null },
  '작별인사': { author: '김영하', pageCount: 308, isbn: null },
  '타이탄의 도구들': { author: '팀 페리스' },
  '지금 당장 포르쉐를 타라': { author: '김민성' },
  '어린 왕자': { author: '앙투안 드 생텍쥐페리', pageCount: null, isbn: null },
  '우리가 빛의 속도로 갈 수 없다면': { author: '김초엽', pageCount: 352 },
  '지적 대화를 위한 넓고 얕은 지식 1': { author: '채사장' },
  '망원동 브라더스': { author: '김호연', pageCount: 364 },
  '부의 추월차선': { author: '엠제이 드마코', pageCount: 392 },
  '거인의 노트': { author: '김익한', pageCount: 296 },
  '동물농장': { author: '조지 오웰', pageCount: 200 },
  '역행자': { author: '자청' },
  '오늘 밤, 세계에서 이 사랑이 사라진다 해도': { author: '이치조 미사키', pageCount: 376, isbn: null },
  '차트의 기술': { author: '김정환' },
  '세상의 마지막 기차역': { author: '무라세 다케시', pageCount: 324 },
  'The One Thing': { author: '게리 켈러, 제이 파파산', pageCount: 240 },
  '달러구트 꿈 백화점 1 2': { author: '이미예', pageCount: null },
  '더 테라피스트': { author: 'B. A. 패리스', pageCount: null, isbn: null },
  '우리 몸 오류 보고서': { author: '네이선 렌츠' },
  '돈의 심리학': { author: '모건 하우절', pageCount: 396, isbn: null },
  '부자 아빠 가난한 아빠': { author: '로버트 기요사키' },
  '백년허리 1 2': { author: '정선근', pageCount: 560 },
  '오직 두 사람': { author: '김영하', pageCount: 272 },
  '부의 시그널': { author: '박종훈' },
  '아들아, 돈 공부 해야한다': { author: '정선용' },
  '까마귀의 엄지': { author: '미치오 슈스케', pageCount: 380 },
  '나미야 잡화점의 기적': { author: '히가시노 게이고', pageCount: 456 },
  '클루지': { author: '개리 마커스' },
  '다빈치 코드 1 2': { author: '댄 브라운', pageCount: null },
  '미드나잇 라이브러리': { author: '매트 헤이그' },
  '심판': { author: '베르나르 베르베르', pageCount: 224 },
  '돌이킬 수 없는 약속': { author: '야쿠마루 가쿠', pageCount: 416 },
  '불편한 편의점': { author: '김호연' },
};

function applyBookOverride(post, metadata) {
  const merged = { ...metadata, metadataVersion: METADATA_VERSION };
  for (const [key, value] of Object.entries(BOOK_OVERRIDES[post.title] ?? {})) {
    if (value === null) delete merged[key];
    else merged[key] = value;
  }
  return merged;
}

function attrs(node) {
  return Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
}

function attr(node, name) {
  if (!node) return undefined;
  return attrs(node)[name];
}

function classes(node) {
  return new Set((attr(node, 'class') ?? '').split(/\s+/).filter(Boolean));
}

function hasClass(node, name) {
  return classes(node).has(name);
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
}

function findAll(node, predicate) {
  const results = [];
  walk(node, (candidate) => {
    if (predicate(candidate)) results.push(candidate);
  });
  return results;
}

function findFirst(node, predicate) {
  let result;
  walk(node, (candidate) => {
    if (!result && predicate(candidate)) result = candidate;
  });
  return result;
}

function textContent(node) {
  if (!node) return '';
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function cleanText(value) {
  return value
    .replace(/[\u200B-\u200D\uFE0E\uFE0F\uFEFF]/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

function escapeYaml(value) {
  return JSON.stringify(value.replace(/\r?\n/g, ' '));
}

function renderInline(node) {
  if (!node) return '';
  if (node.nodeName === '#text') return node.value ?? '';
  if (node.tagName === 'br') return '\n';

  const content = (node.childNodes ?? []).map(renderInline).join('');
  const normalized = cleanText(content);
  if (!normalized) return '';

  if (node.tagName === 'strong' || node.tagName === 'b') return `**${normalized}**`;
  if (node.tagName === 'em' || node.tagName === 'i') return `*${normalized}*`;
  if (node.tagName === 's' || node.tagName === 'del') return `~~${normalized}~~`;
  if (node.tagName === 'a') {
    const href = attr(node, 'href');
    return href && !href.startsWith('#') && !href.startsWith('javascript:')
      ? `[${normalized}](${href})`
      : normalized;
  }
  return content;
}

function paragraphMarkdown(paragraph, title) {
  const plain = cleanText(textContent(paragraph));
  if (!plain || plain === title || /^[♥♡]{3,}$/.test(plain)) return '';

  const inline = cleanText(renderInline(paragraph));
  const descendantClasses = findAll(paragraph, (node) => Boolean(attr(node, 'class')))
    .flatMap((node) => [...classes(node)]);
  const emphasized = findFirst(paragraph, (node) => ['b', 'strong', 'i', 'em'].includes(node.tagName));
  const large = descendantClasses.some((name) => /se-fs-(?:fs)?(?:19|24|28|30|32|34|36|38|40)/.test(name));

  if (large || (emphasized && plain.length <= 60)) {
    return `## ${plain.replace(/^#+\s*/, '')}`;
  }
  return inline;
}

function componentMarkdown(component, title, imageIndex) {
  const componentClasses = classes(component);

  if (componentClasses.has('se-text')) {
    const paragraphs = findAll(component, (node) => node.tagName === 'p' && hasClass(node, 'se-text-paragraph'));
    return paragraphs.map((paragraph) => paragraphMarkdown(paragraph, title)).filter(Boolean).join('\n\n');
  }

  if (componentClasses.has('se-code')) {
    const source = findFirst(component, (node) => hasClass(node, 'se-code-source'))
      ?? findFirst(component, (node) => node.tagName === 'pre');
    const code = cleanText(textContent(source));
    return code ? `\`\`\`\n${code}\n\`\`\`` : '';
  }

  if (componentClasses.has('se-quotation')) {
    const lines = findAll(component, (node) => node.tagName === 'p')
      .map((node) => cleanText(textContent(node)))
      .filter(Boolean);
    return lines.map((line) => `> ${line}`).join('\n>\n');
  }

  if (componentClasses.has('se-horizontalLine')) return '---';

  if (componentClasses.has('se-image')) {
    return `{{NAVER_IMAGE_${imageIndex}}}`;
  }

  if (componentClasses.has('se-table')) {
    const rows = findAll(component, (node) => node.tagName === 'tr')
      .map((row) => findAll(row, (node) => node.tagName === 'td' || node.tagName === 'th')
        .map((cell) => cleanText(textContent(cell)).replace(/\|/g, '\\|')))
      .filter((row) => row.length);
    if (!rows.length) return '';
    return [
      `| ${rows[0].join(' | ')} |`,
      `| ${rows[0].map(() => '---').join(' | ')} |`,
      ...rows.slice(1).map((row) => `| ${row.join(' | ')} |`),
    ].join('\n');
  }

  if (componentClasses.has('se-oglink')) {
    const link = findFirst(component, (node) => node.tagName === 'a' && attr(node, 'href'));
    if (!link) return '';
    const label = cleanText(textContent(link)) || attr(link, 'href');
    return `[${label}](${attr(link, 'href')})`;
  }

  return '';
}

function getMeta(document, property) {
  const meta = findFirst(document, (node) => node.tagName === 'meta' && attr(node, 'property') === property);
  return attr(meta, 'content') ?? '';
}

function imageSource(component) {
  const link = findFirst(component, (node) => Boolean(attr(node, 'data-linkdata')));
  if (link) {
    try {
      const parsed = JSON.parse(attr(link, 'data-linkdata'));
      if (parsed.src) return parsed.src;
    } catch {
      // Fall through to the rendered image URL.
    }
  }
  const image = findFirst(component, (node) => node.tagName === 'img');
  return (attr(image, 'data-lazy-src') || attr(image, 'src') || '').replace(/\?type=.*$/, '');
}

function mapCategory(naverCategory) {
  if (['문학', '비문학'].includes(naverCategory)) return 'Books';
  if (['코딩테스트', 'DFS/BFS', 'DP', '나코딩하는남자야.', '포너블'].includes(naverCategory)) return 'Development';
  return 'Retrospective';
}

function deriveTags(category, body) {
  const safeCategory = category === 'DFS/BFS' ? 'DFS-BFS' : category;
  const tags = new Set(safeCategory ? [safeCategory] : []);
  if (/\bJAVA\b|자바/.test(body)) tags.add('Java');
  if (/\bC\+\+\b/.test(body)) tags.add('C++');
  if (/\bPython\b|파이썬/.test(body)) tags.add('Python');
  if (/백준/.test(body)) tags.add('백준');
  if (/알고리즘|다익스트라|플로이드|DFS|BFS|DP/.test(body)) tags.add('알고리즘');
  return [...tags];
}

function parseDate(value) {
  const match = value.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
  if (!match) throw new Error(`날짜를 해석할 수 없습니다: ${value}`);
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
}

function descriptionFromBody(body, title) {
  const text = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]+\]\([^)]*\)/g, (match) => match.replace(/^\[|\]\([^)]*\)$/g, ''))
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const withoutTitle = text.startsWith(title) ? text.slice(title.length).trim() : text;
  return withoutTitle.length > 150 ? `${withoutTitle.slice(0, 147).trim()}…` : withoutTitle || `${title}에 대한 기록.`;
}

async function fetchText(url) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
    if (response.ok) return response.text();
    if (![403, 429].includes(response.status) && response.status < 500) {
      throw new Error(`${response.status} ${url}`);
    }
    const baseDelay = response.status === 403 ? 5000 : 1500;
    await sleep(baseDelay * (attempt + 1));
  }
  throw new Error(`반복 요청에 실패했습니다: ${url}`);
}

async function getPublicPostIds() {
  const ids = [];
  const seen = new Set();
  for (let page = 1; page <= 100; page += 1) {
    const html = await fetchText(`${BLOG_ORIGIN}/PostList.naver?blogId=${BLOG_ID}&from=postList&currentPage=${page}`);
    const pageIds = [...new Set([...html.matchAll(new RegExp(`https://blog\\.naver\\.com/${BLOG_ID}/(\\d+)`, 'g'))]
      .map((match) => match[1]))]
      .filter((id) => !seen.has(id));
    if (!pageIds.length) break;
    for (const id of pageIds) {
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

async function parsePost(logNo) {
  const originalUrl = `${BLOG_ORIGIN}/${BLOG_ID}/${logNo}`;
  const html = await fetchText(`${BLOG_ORIGIN}/PostView.naver?blogId=${BLOG_ID}&logNo=${logNo}&redirect=Dlog&widgetTypeCall=true&directAccess=false`);
  const document = parse(html);
  const documentTitle = findFirst(document, (node) => hasClass(node, 'se-documentTitle'));
  const title = cleanText(getMeta(document, 'og:title') || textContent(findFirst(documentTitle, (node) => hasClass(node, 'se-title-text'))));
  const category = cleanText(textContent(findFirst(documentTitle, (node) => hasClass(node, 'blog2_series'))));
  const publishedAt = parseDate(cleanText(textContent(findFirst(documentTitle, (node) => hasClass(node, 'se_publishDate')))));
  const main = findFirst(document, (node) => hasClass(node, 'se-main-container'));
  if (!main) throw new Error(`${logNo}: 본문을 찾지 못했습니다.`);

  const components = (main.childNodes ?? []).filter((node) => hasClass(node, 'se-component'));
  const imageComponents = components.filter((node) => hasClass(node, 'se-image'));
  const images = imageComponents.map((component) => imageSource(component)).filter(Boolean);
  let imageIndex = 0;
  let body = components.map((component) => {
    const markdown = componentMarkdown(component, title, imageIndex);
    if (hasClass(component, 'se-image')) imageIndex += 1;
    return markdown;
  }).filter(Boolean).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

  const ratingText = cleanText(textContent(main)).match(/[♥♡]{3,}/)?.[0] ?? '';
  const rating = ratingText ? [...ratingText].filter((character) => character === '♥').length : undefined;
  const ogImage = getMeta(document, 'og:image');
  const isbn = ogImage.match(/(97[89]\d{10})/)?.[1];
  const astroCategory = mapCategory(category);
  const tags = deriveTags(category, body);

  return {
    logNo,
    originalUrl,
    title,
    category,
    astroCategory,
    publishedAt,
    rating,
    isbn,
    images,
    body,
    tags,
  };
}

async function loadMetadataCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function parseBookSearch(html, fallbackIsbn) {
  const document = parse(html);
  const plain = cleanText(textContent(document));
  const isbn = fallbackIsbn
    || plain.match(/ISBN\s*[:：]?\s*(97[89]\d{10})/)?.[1]
    || html.match(/(97[89]\d{10})/)?.[1];
  const writerNode = findFirst(document, (node) => node.tagName === 'span' && hasClass(node, 'writer'));
  const productImage = findFirst(document, (node) => node.tagName === 'img' && /\|/.test(attr(node, 'alt') ?? ''));
  const productImageAuthor = attr(productImage, 'alt')?.split('|')?.[1]?.trim();
  const author = cleanText(textContent(writerNode))
    || productImageAuthor
    || plain.match(/자료명\/저자사항\s*:\s*.*?\/\s*(?:지은이|저자|글쓴이)\s*:\s*([^,]+),\s*발행사항/)?.[1]?.trim()
    || plain.match(/서명\/저자사항\s*:\s*.*?\/\s*([^,]+?)(?:\s+지음)?,\s*발행사항/)?.[1]?.trim()
    || plain.match(/([가-힣A-Za-zÀ-ž·,.\s]{2,45})\s+저자\(글\)/)?.[1]?.trim();
  const pageCountText = plain.match(/형태사항\s*:\s*([\d,]+)\s*p/i)?.[1]
    || plain.match(/페이지\s*([\d,]+)\s*(?:Page|쪽)/i)?.[1]
    || plain.match(/([\d,]+)\s*쪽/)?.[1];
  const parsedPageCount = pageCountText ? Number(pageCountText.replace(/,/g, '')) : undefined;
  const pageCount = parsedPageCount && parsedPageCount >= 10 && parsedPageCount <= 5000
    ? parsedPageCount
    : undefined;
  const normalizedAuthor = author
    ?.replace(/,?\s*\d{4}-?(?:\d{4})?\.?$/, '')
    .replace(/,?\s*author\.?$/i, '')
    .replace(/\s+(?:지음|저)$/u, '')
    .replace(/\s+/g, ' ')
    .trim();
  const validAuthor = normalizedAuthor && !/페이지|ISBN|네이버|검색|도서관명|형태사항|발행사항|performance|mark/i.test(normalizedAuthor)
    ? normalizedAuthor
    : undefined;
  return { author: validAuthor, pageCount, isbn };
}

function normalizeBookTitle(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/\s*\(\d+회독\)\s*$/, '')
    .replace(/[^0-9A-Za-z가-힣]/g, '')
    .toLocaleLowerCase();
}

function exactBookCardText(html, title) {
  const document = parse(html);
  const normalizedTitle = normalizeBookTitle(title);
  const candidates = findAll(document, (node) => {
    if (node.tagName !== 'span' || !String(attr(node, 'class')).includes('headline')) return false;
    const candidate = normalizeBookTitle(textContent(node));
    return candidate === normalizedTitle || candidate.startsWith(normalizedTitle) || normalizedTitle.startsWith(candidate);
  }).sort((a, b) => textContent(a).length - textContent(b).length);
  let current = candidates[0];
  while (current && !String(attr(current, 'class')).includes('api_subject_bx')) current = current.parentNode;
  return current ? cleanText(textContent(current)) : '';
}

function parseTitleBookSearch(html, title) {
  const card = exactBookCardText(html, title);
  if (!card) return parseBookSearch(html);
  const isbn = card.match(/ISBN\s*[:：]?\s*(97[89]\d{10})/)?.[1];
  const author = card.match(/(?:저자|지은이)\s*[:：]\s*([^;|]{2,45})/)?.[1]?.trim()
    || card.match(/\|\s*([^|]{2,35})\s*\|/)?.[1]?.trim();
  const pageText = card.match(/페이지\s*([\d,]+)\s*(?:Page|쪽)/i)?.[1]
    || card.match(/형태사항\s*[:：]?\s*([\d,]+)\s*p/i)?.[1]
    || card.match(/([\d,]+)\s*p\./i)?.[1];
  const parsedPageCount = pageText ? Number(pageText.replace(/,/g, '')) : undefined;
  const cardMetadata = {
    isbn,
    author: author && !/페이지|ISBN|검색|도서관|출판사/i.test(author) ? author.replace(/\s+/g, ' ') : undefined,
    pageCount: parsedPageCount && parsedPageCount >= 10 && parsedPageCount <= 5000 ? parsedPageCount : undefined,
  };
  const fallback = parseBookSearch(html, cardMetadata.isbn);
  return {
    isbn: cardMetadata.isbn || fallback.isbn,
    author: cardMetadata.author || fallback.author,
    pageCount: cardMetadata.pageCount || fallback.pageCount,
  };
}

async function lookupBookMetadata(post, cache) {
  if (!REFRESH_METADATA && cache[post.logNo]?.metadataVersion === METADATA_VERSION) {
    cache[post.logNo] = applyBookOverride(post, cache[post.logNo]);
    return cache[post.logNo];
  }
  const titleQuery = post.isbn || `${post.title.replace(/\s*\(\d+회독\)\s*$/, '')} 책 저자 페이지 ISBN`;
  const titleSearchUrl = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(titleQuery)}`;
  const titleHtml = await fetchText(titleSearchUrl);
  const firstPass = post.isbn
    ? parseBookSearch(titleHtml, post.isbn)
    : parseTitleBookSearch(titleHtml, post.title);
  let metadata = firstPass;
  let sourceUrl = titleSearchUrl;

  if (firstPass.isbn && !post.isbn) {
    await sleep(180);
    const isbnSearchUrl = `https://search.naver.com/search.naver?where=nexearch&query=${firstPass.isbn}`;
    const isbnHtml = await fetchText(isbnSearchUrl);
    const isbnPass = parseBookSearch(isbnHtml, firstPass.isbn);
    metadata = {
      author: isbnPass.author || firstPass.author,
      pageCount: isbnPass.pageCount || firstPass.pageCount,
      isbn: firstPass.isbn,
    };
    sourceUrl = isbnSearchUrl;
  }

  cache[post.logNo] = applyBookOverride(post, { ...metadata, sourceUrl });
  await writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);
  await sleep(420);
  return cache[post.logNo];
}

async function downloadImage(url, destination) {
  try {
    const stats = await sharp(destination).stats();
    return stats.dominant;
  } catch {
    // The asset has not been downloaded yet, or needs to be replaced.
  }
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'user-agent': USER_AGENT, referer: `${BLOG_ORIGIN}/` } });
    if (response.ok) {
      const input = Buffer.from(await response.arrayBuffer());
      await sharp(input)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(destination);
      const stats = await sharp(destination).stats();
      return stats.dominant;
    }
    if (![403, 429].includes(response.status) && response.status < 500) {
      throw new Error(`이미지 다운로드 실패: ${response.status} ${url}`);
    }
    await sleep(1200 * (attempt + 1));
  }
  throw new Error(`이미지 다운로드 반복 실패: ${url}`);
}

function hexColor({ r, g, b }) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

async function writePost(post, metadata) {
  const slug = `naver-${post.logNo}`;
  const imagePaths = [];
  let coverColor = { r: 92, g: 111, b: 72 };

  for (let index = 0; index < post.images.length; index += 1) {
    const isCover = index === 0;
    const directory = isCover ? COVERS_DIR : IMAGES_DIR;
    const webDirectory = isCover ? '/covers/naver' : '/images/naver';
    const filename = `${slug}-${index + 1}.webp`;
    try {
      const color = await downloadImage(post.images[index], join(directory, filename));
      if (isCover) coverColor = color;
      imagePaths.push(`${webDirectory}/${filename}`);
    } catch (error) {
      console.warn(`[이미지 제외] ${post.title}: ${error.message}`);
      imagePaths.push('');
    }
  }

  let body = post.body;
  for (let index = 0; index < post.images.length; index += 1) {
    const markdown = imagePaths[index]
      ? `![${post.title}${index ? ` 이미지 ${index + 1}` : ' 표지'}](${imagePaths[index]})`
      : '';
    body = body.replace(
      `{{NAVER_IMAGE_${index}}}`,
      post.astroCategory === 'Books' && index === 0 ? '' : markdown,
    );
  }
  body = body.replace(/\{\{NAVER_IMAGE_\d+\}\}/g, '').replace(/\n{3,}/g, '\n\n').trim();

  const lines = [
    '---',
    `title: ${escapeYaml(post.title)}`,
    `description: ${escapeYaml(descriptionFromBody(body, post.title))}`,
    `publishedAt: ${post.publishedAt}`,
    `category: ${post.astroCategory}`,
    `tags: [${post.tags.map(escapeYaml).join(', ')}]`,
    ...(imagePaths[0] ? [`cover: ${imagePaths[0]}`] : []),
  ];

  if (post.astroCategory === 'Books') {
    lines.push(
      'book:',
      ...(metadata.author ? [`  author: ${escapeYaml(metadata.author)}`] : []),
      ...(metadata.pageCount ? [`  pageCount: ${metadata.pageCount}`] : []),
      ...(post.rating !== undefined ? [`  rating: ${post.rating}`] : []),
      `  spineColor: ${escapeYaml(hexColor(coverColor))}`,
      ...(metadata.isbn ? [`  isbn: ${escapeYaml(metadata.isbn)}`] : []),
    );
  }
  lines.push('draft: false', '---', '', body, '');
  await writeFile(join(POSTS_DIR, `${slug}.md`), lines.join('\n'));
}

async function main() {
  const ids = await getPublicPostIds();
  console.log(`공개 글 ${ids.length}개를 확인했습니다.`);
  const posts = [];
  let cursor = 0;
  const workers = Array.from({ length: 2 }, async () => {
    while (cursor < ids.length) {
      const index = cursor;
      cursor += 1;
      const post = await parsePost(ids[index]);
      posts[index] = post;
      console.log(`[본문 ${index + 1}/${ids.length}] ${post.title}`);
      await sleep(120);
    }
  });
  await Promise.all(workers);

  const cache = await loadMetadataCache();
  const unresolved = [];
  for (const post of posts.filter((candidate) => candidate.astroCategory === 'Books')) {
    const metadata = await lookupBookMetadata(post, cache);
    if (!metadata.author || !metadata.pageCount) unresolved.push({ logNo: post.logNo, title: post.title, ...metadata });
    console.log(`[도서] ${post.title} — ${metadata.author || '?'} / ${metadata.pageCount || '?'}쪽`);
  }
  await writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);

  const categoryCounts = posts.reduce((counts, post) => {
    counts[post.astroCategory] = (counts[post.astroCategory] ?? 0) + 1;
    return counts;
  }, {});
  console.log('카테고리:', categoryCounts);
  console.log('도서 정보 확인 필요:', unresolved);
  await writeFile(REVIEW_FILE, `${JSON.stringify(unresolved, null, 2)}\n`);

  if (!WRITE) {
    console.log('--write 옵션이 없어 파일은 생성하지 않았습니다.');
    return;
  }

  await Promise.all([mkdir(COVERS_DIR, { recursive: true }), mkdir(IMAGES_DIR, { recursive: true })]);
  for (let index = 0; index < posts.length; index += 1) {
    const post = posts[index];
    const metadata = cache[post.logNo];
    await writePost(post, metadata ?? {});
    console.log(`[저장 ${index + 1}/${posts.length}] ${post.title}`);
  }
}

await main();
