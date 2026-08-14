import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/content/posts');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanDescription(frontmatter) {
  return frontmatter.replace(/^description: (.+)$/m, (line, encoded) => {
    try {
      const description = JSON.parse(encoded)
        .replace(/\s*원문:\s*네이버 블로그\s*$/u, '')
        .trim();
      return `description: ${JSON.stringify(description)}`;
    } catch {
      return line;
    }
  });
}

function cleanPost(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return source;

  let frontmatter = match[1]
    .replace(/^originalUrl:.*\n?/m, '')
    .replace(/^\s+sourceUrl:.*\n?/m, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  frontmatter = cleanDescription(frontmatter);

  let body = match[2]
    .replace(/\n*---\n\n원문:\s*\[네이버 블로그\]\([^\n)]+\)\s*$/u, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (/^category: Books$/m.test(frontmatter)) {
    const cover = frontmatter.match(/^cover:\s*(.+)$/m)?.[1]?.trim();
    if (cover) {
      body = body
        .replace(new RegExp(`^!\\[[^\\n]*\\]\\(${escapeRegExp(cover)}\\)\\s*`, 'm'), '')
        .replace(/^---\s*/u, '')
        .trim();
    }
  }

  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

const filenames = (await readdir(POSTS_DIR)).filter((name) => name.startsWith('naver-') && name.endsWith('.md'));
for (const filename of filenames) {
  const path = join(POSTS_DIR, filename);
  const source = await readFile(path, 'utf8');
  await writeFile(path, cleanPost(source));
}

console.log(`${filenames.length}개 이전 글에서 상세 표지와 원문 링크를 정리했습니다.`);
