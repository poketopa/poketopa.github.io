import type { Category } from '../consts';
import type { Post } from './posts';

interface SubcategoryDefinition {
  key: string;
  label: string;
  tags: string[];
}

export interface SubcategoryItem {
  key: string;
  label: string;
  count: number;
}

interface SubcategoryState {
  items: SubcategoryItem[];
  topicsByPostId: Record<string, string[]>;
}

const DEFINITIONS: Partial<Record<Category, SubcategoryDefinition[]>> = {
  Development: [
    { key: 'Java', label: 'Java', tags: ['Java'] },
    { key: 'Spring', label: 'Spring', tags: ['Spring', 'JPA'] },
    { key: '알고리즘', label: '알고리즘', tags: ['알고리즘', 'DFS-BFS'] },
    { key: 'CS', label: 'CS', tags: ['네트워크', '웹'] },
    { key: '보안', label: '보안', tags: ['보안'] },
  ],
  Retrospective: [
    { key: '우아한 테크코스', label: '우아한 테크코스', tags: ['우아한 테크코스'] },
  ],
};

const normalizeTag = (tag: string) => tag.normalize('NFKC').toLocaleLowerCase('ko-KR').trim();

export const getSubcategoryState = (category: Category, posts: Post[]): SubcategoryState | null => {
  const definitions = DEFINITIONS[category];
  if (!definitions) return null;

  const topicsFor = (post: Post) => {
    const postTags = new Set(post.data.tags.map(normalizeTag));
    const topics = definitions
      .filter((definition) => definition.tags.some((tag) => postTags.has(normalizeTag(tag))))
      .map((definition) => definition.key);
    return topics.length > 0 ? topics : ['기타'];
  };

  const topicsByPostId = Object.fromEntries(posts.map((post) => [post.id, topicsFor(post)]));
  const items = [
    ...definitions.map(({ key, label }) => ({ key, label })),
    { key: '기타', label: '기타' },
  ].map((item) => ({
    ...item,
    count: posts.filter((post) => topicsFor(post).includes(item.key)).length,
  }));

  return { items, topicsByPostId };
};
