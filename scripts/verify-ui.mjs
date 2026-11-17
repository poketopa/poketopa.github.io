import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';
import { parse } from 'yaml';

async function page(path) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => errors.push(e));
  const html = await readFile(`dist${path}index.html`, 'utf8');
  const dom = new JSDOM(html, { url: `https://poketopa.github.io${path}`, runScripts: 'outside-only', virtualConsole });
  const {window} = dom;
  window.scrollTo = () => {};
  window.performance.getEntriesByType = () => [];
  for (const script of window.document.querySelectorAll('script')) {
    if (script.type === 'application/ld+json') continue;
    const content = script.src
      ? await readFile('dist' + new URL(script.src).pathname, 'utf8')
      : script.textContent;
    // Astro's built component scripts have no imports; fail loudly if that changes.
    assert.ok(!/^import\s/m.test(content), `Script imports need a module runner: ${script.src}`);
    window.eval(content);
  }
  assert.deepEqual(errors, [], `Runtime errors: ${path}`);
  return dom;
}
const sourceFiles = (await readdir('src/content/posts')).filter(p => /\.mdx?$/.test(p));
let expected = 0;
for (const file of sourceFiles) {
  const text = await readFile(`src/content/posts/${file}`, 'utf8');
  if (parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]).draft !== true) expected++;
}
for (const lang of ['', '/en']) {
  const dom = await page(`${lang}/`);
  const {document, Event} = dom.window;
  const cards = [...document.querySelectorAll('[data-post-item]')];
  if (!process.argv.includes('--partial')) assert.equal(cards.length, expected, `${lang} homepage count`);
  assert.equal(cards.filter(e => !e.hidden).length, Math.min(24, cards.length));
  document.querySelector('[data-archive-more]').click();
  assert.equal(cards.filter(e => !e.hidden).length, Math.min(48, cards.length));
  const search = document.querySelector('[data-archive-search]');
  search.value = 'nonexistent-query-01928374';
  search.dispatchEvent(new Event('input'));
  assert.equal(cards.filter(e => !e.hidden).length, 0);
  assert.equal(document.querySelector('[data-archive-empty]').hidden, false);
  document.querySelector('[data-archive-reset]').click();
  assert.equal(cards.filter(e => !e.hidden).length, Math.min(24, cards.length));
  search.value = cards[0].querySelector('h2').textContent;
  search.dispatchEvent(new Event('input'));
  assert.ok(!cards[0].hidden, 'English or Korean title search');
  if (lang) assert.match(document.querySelector('[data-archive-status]').textContent, /^Showing/);
  dom.window.close();

  const books = await page(`${lang}/categories/books/`);
  const d = books.window.document;
  d.querySelector('[data-book-tab="list"]').click();
  assert.equal(d.querySelector('[data-book-panel="list"]').hidden, false);
  assert.equal(d.querySelector('[data-book-panel="shelf"]').hidden, true);
  d.querySelector('[data-book-search]').value = 'nonexistent-query-01928374';
  d.querySelector('[data-book-search]').dispatchEvent(new books.window.Event('input'));
  assert.equal(d.querySelector('[data-book-empty]').hidden, false);
  d.querySelector('[data-book-reset]').click();
  assert.equal(d.querySelector('[data-book-empty]').hidden, true);
  if (lang) assert.match(d.querySelector('[data-book-status]').textContent, /^Showing/);
  books.window.close();

  const categories = await page(`${lang}/categories/development/`);
  const c = categories.window.document;
  const filter = c.querySelector('[data-archive-topic]');
  if (!filter && process.argv.includes('--partial')) { categories.window.close(); continue; }
  assert.ok(filter, 'Development topic filter exists');
  filter.click();
  assert.equal(filter.getAttribute('aria-pressed'), 'true');
  assert.ok([...c.querySelectorAll('[data-post-item]')].filter(e => !e.hidden).every(e => e.dataset.topics.split('|').includes(filter.dataset.archiveTopic)));
  categories.window.close();
}
console.log('Both languages: search, pagination, empty/reset, topic filters, and bookshelf/list verified.');
