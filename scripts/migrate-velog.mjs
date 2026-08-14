import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const USERNAME = 'lhs5427ll';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/content/posts');
const COVERS_DIR = join(ROOT, 'public/covers/velog');
const IMAGES_DIR = join(ROOT, 'public/images/velog');
const REPORT_FILE = join(ROOT, 'scripts/velog-migration-report.json');
const WRITE = process.argv.includes('--write');
const USER_AGENT = 'ludens.dev Velog migration (https://poketopa.github.io/)';

const POST_PATHS = [
  '우아한-테크코스-8기-백엔드-최종-합격-후기',
  '차분-배열-Difference-Array',
  '우아한-테크코스-8기-최종-코딩테스트-후기',
  'static-내부-클래스의-사용',
  'Jackson-라이브러리와-DTO-규칙',
  '서로-다른-자연수의-합-백준-Java',
  '우아한-테크코스-8기-오픈미션-보고서',
  '우아한-테크코스-8기-프리코스-3주차-회고',
  '우아한-테크코스-8기-프리코스-1주차-회고-zx6tam1f',
  '우아한-테크코스-8기-프리코스-1주차-회고',
  '다음-순열-백준-Java',
  '내리막-길-백준-Java',
  '감시-백준-Java',
  'Spring-Security-자동-설정으로-인한-Swagger-Postman-401-Unauthorized-에러',
  'Java-리플렉션-Reflection',
  'NoArgsConstructor-에서의-PROTECTED-사용',
  '클래스-레벨-Setter-사용의-위험성',
  '동물원-백준-Java',
  'JWTJSON-Web-Token란',
  'HTTP-주소창에-넣는-그거',
  '백준-2565번-전깃줄-Java',
  'React-Spring-기초-실습-블로그-미니-프로젝트',
  '배낭-문제-Knapsack-Problem',
  'Java-Integer이-있는데-int를-왜-쓰나요-eku8ng03',
  'Java-모든-클래스의-어머니-Object-클래스에-대하여',
  'React-2주차-정리',
  'React-1주차-정리',
  'Node.js-실습-코드-복기',
  '유니온-파인드-Union-Find',
  '줄-세우기-백준-Java',
  '위상-정렬',
  '벽-부수고-이동하기-4-백준-Java',
  '히스토그램에서-가장-큰-직사각형-백준-Java',
  '부분배열-고르기-백준-Java',
  '최소비용-구하기-2-백준-JAVA',
  'LCSLongest-Common-Subsequence-백준-JAVA',
  '별-찍기-11-백준-JAVA',
  '문자열-폭발-백준-Java',
  'Temp-Title',
  '이진-탐색-Binary-Search',
  '플로이드-워셜-알고리즘-Floyd-Warshall-Algorithm',
  '다익스트라-알고리즘-Dijkstra-algorithm',
  'JS-챌린지-5일차-TIL',
  'JS-챌린지-4일차-TIL',
  'JS-챌린지-3일차-TIL',
  'JS-챌린지-2일차-TIL',
  'JS-챌린지-1일차-TIL',
];

const NAVER_REPLACEMENTS = {
  '다익스트라 알고리즘 Dijkstra algorithm': 'naver-223744152147.md',
  '플로이드-워셜 알고리즘 Floyd-Warshall Algorithm': 'naver-223745149736.md',
  '이진 탐색 (Binary Search)': 'naver-223755926291.md',
  '가장 긴 증가하는 부분 수열 2 (백준, Java)': 'naver-223756006583.md',
  '문자열 폭발 (백준, Java)': 'naver-223763712068.md',
  '별 찍기 - 11 (백준, JAVA)': 'naver-223787555857.md',
  'LCS(Longest Common Subsequence) (백준, JAVA)': 'naver-223787632182.md',
  '최소비용 구하기 2 (백준, JAVA)': 'naver-223792296249.md',
};

const POST_URLS = POST_PATHS.map((slug) => `https://velog.io/@${USERNAME}/${encodeURI(slug)}`);

function normalizeTitle(value) {
  return value
    .normalize('NFKC')
    .replace(/^\[백준\]\s*/u, '')
    .replace(/\(백준,?\s*Java\)$/iu, '')
    .replace(/[^0-9A-Za-z가-힣]/gu, '')
    .toLocaleLowerCase();
}

function slugify(value) {
  return value
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFE0E\uFE0F\uFEFF]/gu, '')
    .toLocaleLowerCase()
    .replace(/[^0-9a-z가-힣]+/gu, '-')
    .replace(/^-+|-+$/gu, '')
    .replace(/-{2,}/gu, '-');
}

function localDate(value) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}

function cleanDescription(value, body) {
  const source = (value || body)
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/https?:\/\/\S+/gu, ' ')
    .replace(/[`*_>#|~\[\]()]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
  if (!source) return '기술을 배우고 문제를 해결한 과정을 정리한 기록입니다.';
  return source.length > 180 ? `${source.slice(0, 177).trimEnd()}…` : source;
}

function escapeYaml(value) {
  return JSON.stringify(value.replace(/\r?\n/gu, ' '));
}

function parseApolloPost(html, url) {
  const prefix = 'window.__APOLLO_STATE__=';
  const start = html.indexOf(prefix);
  if (start < 0) throw new Error(`Apollo state not found: ${url}`);
  const scriptEnd = html.indexOf('</script>', start);
  const raw = html.slice(start + prefix.length, scriptEnd).replace(/;\s*$/u, '');
  const state = JSON.parse(raw);
  const post = Object.entries(state).find(
    ([key, value]) => key.startsWith('Post:') && value && typeof value === 'object' && typeof value.body === 'string',
  )?.[1];
  if (!post || post.is_private || post.is_temp || !post.is_markdown) {
    throw new Error(`Public Markdown post not found: ${url}`);
  }
  return { ...post, title: post.title.trim(), sourceUrl: url };
}

async function fetchWithRetry(url, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
      if (response.ok) return response;
      lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 650));
  }
  throw lastError;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function repairMarkdown(body, title) {
  let repaired = body.replace(/\r\n?/gu, '\n').trim();
  const fences = repaired.split('\n').filter((line) => /^\s*```/u.test(line)).length;
  if (fences % 2 === 1) {
    repaired = `${repaired}\n\n\`\`\``;
    console.warn(`닫히지 않은 코드 펜스를 보정했습니다: ${title}`);
  }
  return repaired;
}

function renderPost(post, body, filename, cover) {
  const category = post.tags.json.includes('우아한 테크코스') ? 'Retrospective' : 'Development';
  const updatedAt = localDate(post.updated_at);
  const publishedAt = localDate(post.released_at);
  const frontmatter = [
    '---',
    `title: ${escapeYaml(post.title)}`,
    `description: ${escapeYaml(cleanDescription(post.short_description, body))}`,
    `publishedAt: ${publishedAt}`,
    ...(updatedAt !== publishedAt ? [`updatedAt: ${updatedAt}`] : []),
    `category: ${category}`,
    `tags: ${JSON.stringify(post.tags.json)}`,
    ...(cover ? [`cover: ${cover}`] : []),
    'source:',
    '  platform: Velog',
    `  id: ${post.id}`,
    `  url: ${post.sourceUrl}`,
    'draft: false',
    '---',
    '',
  ].join('\n');
  return { filename, source: `${frontmatter}${body}\n` };
}

async function readNaverPosts() {
  const filenames = (await readdir(POSTS_DIR)).filter((name) => /^naver-.+\.md$/u.test(name));
  return Promise.all(
    filenames.map(async (filename) => {
      const source = await readFile(join(POSTS_DIR, filename), 'utf8');
      const encoded = source.match(/^title:\s*(.+)$/mu)?.[1]?.trim() ?? '""';
      let title = encoded;
      try {
        title = JSON.parse(encoded);
      } catch {
        // Keep the raw YAML scalar for older imported files.
      }
      return { filename, title, normalizedTitle: normalizeTitle(title) };
    }),
  );
}

async function removeNaverAssets(filename) {
  const id = basename(filename, '.md').replace(/^naver-/u, '');
  if (!/^\d+$/u.test(id)) throw new Error(`Unexpected Naver filename: ${filename}`);
  for (const directory of [join(ROOT, 'public/covers/naver'), join(ROOT, 'public/images/naver')]) {
    for (const asset of await readdir(directory)) {
      if (asset.startsWith(`naver-${id}-`)) await unlink(join(directory, asset));
    }
  }
}

const posts = await mapLimit(POST_URLS, 6, async (url) => {
  const response = await fetchWithRetry(url);
  return parseApolloPost(await response.text(), url);
});

if (posts.length !== 47 || new Set(posts.map((post) => post.id)).size !== 47) {
  throw new Error(`Expected 47 unique posts, received ${posts.length}`);
}

const existingPostFiles = (await readdir(POSTS_DIR)).filter((name) => /\.mdx?$/u.test(name));
const existingPostFileSet = new Set(existingPostFiles);
const naverPosts = await readNaverPosts();
const replacements = Object.entries(NAVER_REPLACEMENTS).map(([title, filename]) => {
  const existing = naverPosts.find((post) => post.filename === filename);
  const incoming = posts.find((post) => post.title === title);
  if (!incoming) throw new Error(`Velog replacement is missing: ${title}`);
  if (existing) return { title, filename, existingTitle: existing.title, state: 'pending' };
  const migratedFilename = `${slugify(title)}.md`;
  if (!existingPostFileSet.has(migratedFilename)) {
    throw new Error(`Neither Naver nor migrated Velog post exists: ${filename}`);
  }
  return { title, filename, existingTitle: null, state: 'already-replaced' };
});

const replacementFiles = new Set(replacements.map((item) => item.filename));
const unexpectedMatches = posts.flatMap((post) =>
  naverPosts
    .filter((naverPost) => naverPost.normalizedTitle === normalizeTitle(post.title) && !replacementFiles.has(naverPost.filename))
    .map((naverPost) => ({ velog: post.title, naver: naverPost.title, filename: naverPost.filename })),
);
if (unexpectedMatches.length) throw new Error(`Unexpected Naver duplicates: ${JSON.stringify(unexpectedMatches)}`);

const summary = {
  mode: WRITE ? 'write' : 'dry-run',
  velogPosts: posts.length,
  naverPostsBefore: naverPosts.length,
  replacements,
  newPosts: posts.filter((post) => !existingPostFileSet.has(`${slugify(post.title)}.md`)).length,
  postsAfter:
    existingPostFiles.length
    - replacements.filter((item) => item.state === 'pending').length
    + posts.filter((post) => !existingPostFileSet.has(`${slugify(post.title)}.md`)).length,
  thumbnails: posts.filter((post) => post.thumbnail).length,
  inlineImages: posts.reduce((sum, post) => {
    const matches = post.body.match(/https:\/\/velog\.velcdn\.com\/[^^\s)"'<>]+/gu) ?? [];
    return sum + new Set(matches).size;
  }, 0),
};

if (!WRITE) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

const stage = await mkdtemp(join(tmpdir(), 'ludens-velog-'));
const stagedCovers = join(stage, 'covers');
const stagedImages = join(stage, 'images');
await Promise.all([mkdir(stagedCovers), mkdir(stagedImages)]);

try {
  const renderedPosts = [];
  const assets = [];
  for (const post of posts) {
    const slug = slugify(post.title);
    const filename = `${slug}.md`;
    let body = repairMarkdown(post.body, post.title);
    const imageUrls = [...new Set(body.match(/https:\/\/velog\.velcdn\.com\/[^^\s)"'<>]+/gu) ?? [])];
    imageUrls.forEach((url, index) => {
      const localName = `${slug}-${String(index + 1).padStart(2, '0')}.webp`;
      const localPath = `/images/velog/${localName}`;
      body = body.split(url).join(localPath);
      assets.push({ url, destination: join(stagedImages, localName), final: join(IMAGES_DIR, localName) });
    });

    let cover;
    if (post.thumbnail) {
      const localName = `${slug}-cover.webp`;
      cover = `/covers/velog/${localName}`;
      assets.push({ url: post.thumbnail, destination: join(stagedCovers, localName), final: join(COVERS_DIR, localName) });
    }
    renderedPosts.push(renderPost(post, body, filename, cover));
  }

  const uniqueAssets = [...new Map(assets.map((asset) => [asset.final, asset])).values()];
  await mapLimit(uniqueAssets, 6, async (asset, index) => {
    const response = await fetchWithRetry(asset.url);
    const buffer = Buffer.from(await response.arrayBuffer());
    await sharp(buffer).rotate().webp({ quality: 91 }).toFile(asset.destination);
    if ((index + 1) % 25 === 0 || index + 1 === uniqueAssets.length) {
      console.log(`이미지 ${index + 1}/${uniqueAssets.length}`);
    }
  });

  await Promise.all([mkdir(COVERS_DIR, { recursive: true }), mkdir(IMAGES_DIR, { recursive: true })]);
  await Promise.all(uniqueAssets.map((asset) => copyFile(asset.destination, asset.final)));
  await Promise.all(renderedPosts.map((post) => writeFile(join(POSTS_DIR, post.filename), post.source)));

  for (const replacement of replacements.filter((item) => item.state === 'pending')) {
    await removeNaverAssets(replacement.filename);
    await unlink(join(POSTS_DIR, replacement.filename));
  }

  const report = {
    ...summary,
    migratedAt: new Date().toISOString(),
    assets: uniqueAssets.length,
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      sourceUrl: post.sourceUrl,
      filename: `${slugify(post.title)}.md`,
      replacedNaver: NAVER_REPLACEMENTS[post.title] ?? null,
    })),
  };
  await writeFile(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
} finally {
  await rm(stage, { recursive: true, force: true });
}
