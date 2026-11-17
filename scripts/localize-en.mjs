import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

// Only presentation text is localized here. Article translations live in posts-en.
const labels = {
  '비문학': 'Nonfiction', '문학': 'Fiction', '글쓰기': 'Writing', '녹음': 'Recording',
  '데이터 정합성': 'Data consistency', '데이터베이스': 'Databases', '동시성': 'Concurrency',
  '마음': 'Mind', '메타인지': 'Metacognition', '문제 해결': 'Problem solving',
  '성능 개선': 'Performance', '심리': 'Psychology', '언더독레볼루션': 'Underdog Revolution',
  '여행': 'Travel', '인간관계': 'Relationships', '인공지능': 'Artificial intelligence',
  '일상': 'Daily life', '자기이해': 'Self-understanding', '철학': 'Philosophy',
  '크루위키': 'Crew Wiki', '포너블': 'Pwnable', '프롬프팅': 'Prompting',
  '피드백': 'Feedback', '학습': 'Learning', '협업': 'Collaboration',
  '나코딩하는남자야.': 'I’m a Coder',
  '전체': 'All', '개발': 'Development', '회고': 'Retrospectives', '독후감': 'Book reviews',
  '글': 'Posts', '분류': 'Categories', '소개': 'About', '목차': 'Contents',
  '이 글의 목차': 'On this page', '이전 글': 'Previous post', '다음 글': 'Next post',
  '전체 글 보기': 'All posts', '본문으로 바로가기': 'Skip to content',
  '전체 글': 'All posts', '전체 기록': 'All posts', '기록 검색': 'Search posts',
  '검색 초기화': 'Clear search', '기록 더 보기': 'Show more posts',
  '조건에 맞는 기록이 없습니다.': 'No posts match your filters.',
  '조건에 맞는 독후감이 없습니다.': 'No book reviews match your search.',
  '아직 공개된 글이 없습니다.': 'No posts have been published yet.',
  '첫 번째 기록을 준비하고 있어요.': 'The first post is on its way.',
  '개발, 회고, 독서에 대한 글이 이곳에 쌓입니다.': 'Notes on development, reflection, and reading.',
  '표지나 제목을 선택하면 독후감으로 이동합니다.': 'Select a cover or title to read the review.',
  '독후감 검색': 'Search book reviews', '독후감 보기': 'Book reviews',
  '독후감 보기 방식': 'Book review view', '책장 보기': 'Shelf view', '목록 보기': 'List view',
  '표지가 보이는 읽은 책 진열대': 'Bookshelf with covers', '독후감 더 보기': 'Show more reviews',
  '글 분류': 'Post categories', '이전 및 다음 글': 'Previous and next posts',
  'ludens의 개발 기록, 회고, 독후감': 'Development notes, retrospectives, and book reviews by ludens',
  '알고리즘': 'Algorithms', '네트워크': 'Networking', '웹': 'Web', '보안': 'Security',
  '우아한 테크코스': 'Woowa Tech Course', '기타': 'Other',
  '개의 기록이 쌓였습니다.': ' posts collected.', '개의 경험을 기록했습니다.': ' experiences documented.',
  '번을 돌아봤습니다.': ' retrospectives written.', '권을 읽었습니다.': ' books read.',
  '관심있는 주제로 기록을 탐색해보세요.': 'Explore posts by topic.',
  '놀이듯 배우고,': 'Learning through play,', '배운 것을 기록합니다.': 'writing down what I learn.',
  '안녕하세요,': 'Hello, I’m', '입니다.': '.',
  '개발 과정에서 마주친 문제와 해결의 흔적, 프로젝트를 끝낸 뒤의 회고, 책을 읽고 오래 남은 생각을 기록합니다.': 'I write about problems and solutions in development, reflections on completed projects, and thoughts that stay with me after reading.',
  '기록이 더 나은 질문과 다음 시도로 이어진다고 믿습니다.': 'I believe writing leads to better questions and new attempts.',
  'GitHub에서 보기': 'View on GitHub', '개발 · 회고 · 독후감': 'Development · Retrospectives · Book reviews',
};
function translate(text) {
  const key = text.trim();
  if (key.endsWith(' | homoludens')) return translate(key.slice(0, -13)) + ' | homoludens';
  if (key.endsWith(' 태그의 글')) {
    const tag = key.slice(0, -6);
    return `${labels[tag] || tag} posts`;
  }
  if (key.startsWith('#') && key.slice(1) in labels) return text.replace(key, '#' + labels[key.slice(1)]);
  if (key in labels) return text.replace(key, labels[key]);
  return text.replace(/(\d+)개의 기록/g, '$1 posts').replace(/(\d+)권의 기록/g, '$1 books')
    .replace(/(\d+)개의 글/g, '$1 posts').replace(/(\d+)쪽/g, '$1 pages')
    .replace(/평점 ([\d.]+)점/g, 'Rating: $1').replace(/^(\d+)개$/, '$1 items')
    .replace(/homoludens 홈/g, 'homoludens home')
    .replace(/homoludens와 기록하는 사람 ludens에 대해/g, 'About homoludens and its author, ludens')
    .replace(/주제별로 보는 homoludens의 기록/g, 'Explore homoludens by topic')
    .replace(/(전체 기록|개발 기록|회고 기록|독후감 기록) (검색|찾기)/g, 'Search posts')
    .replace(/(개발|회고|독후감) 태그 필터/g, 'Filter by topic')
    .replace(/(개발|회고|독후감) (분류의 글|글)/g, (_, c) => labels[c])
    .replace(/ 태그의 글/g, ' posts');
}
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : join(dir, e.name)))).flat();
}
export default function englishUI() {
  return { name: 'english-ui', hooks: { 'astro:build:done': async ({ dir }) => {
    const root = fileURLToPath(dir);
    const all = (await files(root)).filter(p => p.endsWith('.html'));
    const routes = new Set(all.map(p => p.slice(root.length).replace(/index\.html$/, '').replace(/^\//, '')));
    for (const path of all.filter(p => p.startsWith(join(root, 'en') + '/'))) {
      const $ = load(await readFile(path, 'utf8'));
      // Keep heading anchors identical so switching language preserves deep links.
      if ($('.prose').length) {
        const ko = load(await readFile(path.replace('/en/', '/'), 'utf8'));
        const oldHeadings = ko('.prose :is(h1,h2,h3,h4,h5,h6)[id]').toArray();
        const newHeadings = $('.prose :is(h1,h2,h3,h4,h5,h6)[id]').toArray();
        if (oldHeadings.length !== newHeadings.length) throw new Error(`Heading count differs: ${path}`);
        const ids = new Map();
        newHeadings.forEach((el, i) => {
          ids.set($(el).attr('id'), ko(oldHeadings[i]).attr('id'));
          $(el).attr('id', ko(oldHeadings[i]).attr('id'));
        });
        $('a[href^="#"]').each((_, el) => {
          const id = decodeURIComponent($(el).attr('href').slice(1));
          if (ids.has(id)) $(el).attr('href', '#' + ids.get(id));
        });
      }

      $('body *').not('script, style, pre, code, .prose *, [data-language]').each((_, el) => {
        if ($(el).closest('.prose, pre, code, svg').length) return;
        $(el).contents().each((_, node) => { if (node.type === 'text') node.data = translate(node.data); });
      });
      $('title').text(translate($('title').text().replace(/ \| homoludens$/, '')) + ($('title').text().includes(' | homoludens') ? ' | homoludens' : ''));
      $('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"], meta[property="og:title"], meta[name="twitter:title"]').each((_, el) => $(el).attr('content', translate($(el).attr('content') || '')));
      $('[aria-label], [placeholder], [title], img[alt]').each((_, el) => {
        for (const attr of ['aria-label', 'placeholder', 'title', 'alt']) {
          const v = $(el).attr(attr); if (v) $(el).attr(attr, translate(v));
        }
      });
      $('time[datetime]').each((_, el) => $(el).text(new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date($(el).attr('datetime')))));
      $('a[href]').not('[data-language]').each((_, el) => {
        const href = $(el).attr('href');
        const url = new URL(href, 'https://poketopa.github.io');
        if (url.origin !== 'https://poketopa.github.io' || href.startsWith('#') || url.pathname.startsWith('/en/')) return;
        const target = 'en' + decodeURI(url.pathname);
        if (routes.has(target)) $(el).attr('href', '/en' + url.pathname + url.search + url.hash);
      });
      $('a[href="/rss.xml"], link[type="application/rss+xml"]').attr('href', '/en/rss.xml');
      $('[data-search]').each((_, el) => $(el).attr('data-search', $(el).text().replace(/\s+/g, ' ') + ' ' + $(el).attr('data-search')));
      await writeFile(path, $.html());
    }
  } } };
}
