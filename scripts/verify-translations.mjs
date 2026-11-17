import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { load } from 'cheerio';
import { parse } from 'yaml';
const sourceDir = 'src/content/posts';
const enDir = 'src/content/posts-en';
const originals = [];
for (const file of (await readdir(sourceDir)).filter(p => /\.mdx?$/.test(p))) {
  const text = await readFile(`${sourceDir}/${file}`, 'utf8');
  if (parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]).draft !== true) originals.push(file);
}
const translations = new Set(await readdir(enDir));
const missing = originals.filter(p => !translations.has(p));
if (!process.argv.includes('--partial')) assert.equal(missing.length, 0, `Missing ${missing.length} translations:\n${missing.join('\n')}`);
const codeBlocks = s => [...s.matchAll(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*$/gm)].map(m => m[0]);
for (const file of originals.filter(file => translations.has(file))) {
  const ko = await readFile(`${sourceDir}/${file}`, 'utf8');
  const en = await readFile(`${enDir}/${file}`, 'utf8');
  const metadata = text => parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
  const koMeta = metadata(ko), enMeta = metadata(en);
  for (const key of ['publishedAt', 'updatedAt', 'category', 'tags', 'cover', 'source', 'draft']) {
    assert.deepEqual(enMeta[key], koMeta[key], `Metadata ${key} changed: ${file}`);
  }
  for (const key of ['pageCount', 'rating', 'spineColor', 'isbn']) {
    assert.deepEqual(enMeta.book?.[key], koMeta.book?.[key], `Book ${key} changed: ${file}`);
  }
  assert.ok(enMeta.title && enMeta.description, `Missing title/description: ${file}`);
  const body = text => text.replace(/^---\r?\n[\s\S]*?\r?\n---/, '');
  const withoutCode = text => body(text).replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*$/gm, '');
  const headings = text => [...withoutCode(text).matchAll(/^(#{1,6})\s+.+$/gm)].map(m => m[1]);
  assert.deepEqual(headings(en), headings(ko), `Heading structure changed: ${file}`);
  const links = text => [...text.matchAll(/\]\(([^\n]*?)\)/g)].map(m => m[1].replace(/\s+["'][\s\S]*["']$/, '')).sort();
  assert.deepEqual(links(en), links(ko), `Markdown link/image target changed: ${file}`);
  assert.deepEqual(codeBlocks(en), codeBlocks(ko), `Code changed: ${file}`);
  assert.ok(en.split('---').slice(2).join('---').trim(), `Empty translation: ${file}`);
}
if (process.argv.includes('--built')) {
  const walk = async (dir) => (await Promise.all((await readdir(dir, {withFileTypes:true})).map(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
  const pages = (await walk('dist')).filter(f => f.endsWith('.html'));
  const known = new Set(pages.map(f => decodeURI(f.slice(4).replace(/index\.html$/, ''))));
  let posts = 0;
  for (const path of pages.filter(f => f.startsWith('dist/en/'))) {
    const $ = load(await readFile(path, 'utf8'));
    assert.equal($('html').attr('lang'), 'en', path);
    assert.ok($('link[rel="canonical"]').attr('href').includes('/en/'), path);
    assert.equal($('[data-language="en"][aria-current="page"]').length, 1, path);
    assert.equal($('link[hreflang="ko"]').length, 1, path);
    if ($('.prose').length) {
      posts++;
      assert.ok($('.prose').text().trim(), `Empty body: ${path}`);
      const ko = load(await readFile(path.replace('/en/', '/'), 'utf8'));
      assert.deepEqual($('.prose pre code').toArray().map(e => $(e).text()), ko('.prose pre code').toArray().map(e => ko(e).text()), `Rendered code changed: ${path}`);
      // Inline backticks also wrap natural-language quotations in these posts.
      // Preserve real identifiers; Korean prose inside backticks is translated.
      const inline = (doc) => doc('.prose code').toArray().filter(e => !doc(e).closest('pre').length).map(e => doc(e).text());
      const sourceInline = inline(ko).filter(text => !/[가-힣]/.test(text));
      const englishInline = inline($);
      for (const identifier of new Set(sourceInline)) {
        assert.ok(englishInline.filter(v => v === identifier).length >= sourceInline.filter(v => v === identifier).length, `Inline identifier missing: ${path}: ${identifier}`);
      }
      assert.deepEqual($('.prose img').toArray().map(e => $(e).attr('src')), ko('.prose img').toArray().map(e => ko(e).attr('src')), `Rendered images changed: ${path}`);
      assert.deepEqual($('.prose :is(h1,h2,h3,h4,h5,h6)[id]').toArray().map(e => $(e).attr('id')), ko('.prose :is(h1,h2,h3,h4,h5,h6)[id]').toArray().map(e => ko(e).attr('id')), `Heading anchors changed: ${path}`);
      $('.toc a, .mobile-toc a').each((_, el) => {
        const id = decodeURIComponent($(el).attr('href').slice(1));
        assert.ok($('[id]').toArray().some(e => $(e).attr('id') === id), `Broken TOC: ${path} #${id}`);
      });
    }
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href.startsWith('/en/') || href === '/en/rss.xml') return;
      const url = new URL(href, 'https://poketopa.github.io');
      assert.ok(known.has(decodeURI(url.pathname)), `Broken English link in ${path}: ${href}`);
      if (url.hash && decodeURI(url.pathname) === decodeURI(path.slice(4).replace(/index\.html$/, ''))) {
        assert.ok($('[id]').toArray().some(e => $(e).attr('id') === decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${href}`);
      }
    });
  }
  assert.equal(posts, originals.length, 'English post count differs');
  const feed = load(await readFile('dist/en/rss.xml', 'utf8'), { xmlMode: true });
  assert.equal(feed('item').length, originals.length, 'English RSS coverage');
  feed('item > link').each((_, el) => assert.ok(feed(el).text().includes('/en/posts/')));
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
  assert.ok(sitemap.includes('https://poketopa.github.io/en/'), 'English sitemap missing');
}
console.log(`Verified ${originals.length - missing.length}/${originals.length} translation files.`);
