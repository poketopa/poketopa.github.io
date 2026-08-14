import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['Development', 'Retrospective', 'Books']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    source: z
      .object({
        platform: z.enum(['Naver', 'Velog']),
        id: z.string(),
        url: z.url(),
      })
      .optional(),
    book: z
      .object({
        author: z.string().optional(),
        pageCount: z.number().int().positive().optional(),
        rating: z.number().min(0).max(5).optional(),
        spineColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        isbn: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
