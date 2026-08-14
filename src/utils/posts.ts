import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
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

export function readingTime(body: string): number {
  const koreanCharacters = body.match(/[\u3131-\uD79D]/g)?.length ?? 0;
  const words = body
    .replace(/[\u3131-\uD79D]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(koreanCharacters / 500 + words / 220));
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
