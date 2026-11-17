import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'> | CollectionEntry<'postsEn'>;

export async function getPublishedPosts(lang: 'ko' | 'en' = 'ko'): Promise<Post[]> {
  const posts = await getCollection(lang === 'en' ? 'postsEn' : 'posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function cleanDescription(description: string): string {
  return description
    .replace(/!\[[\s\S]*?\]\([^)]*\)/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tagSlug(tag: string): string {
  return encodeURIComponent(tag.toLocaleLowerCase());
}
