import type { APIRoute } from 'astro';
import { CATEGORY_LABELS } from '../consts';
import { getPublishedPosts } from '../utils/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  return new Response(
    JSON.stringify(
      posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        category: CATEGORY_LABELS[post.data.category],
        tags: post.data.tags,
        url: `/posts/${post.id}/`,
        publishedAt: post.data.publishedAt.toISOString(),
      })),
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
};
