export const SITE = {
  title: 'ludens.dev',
  author: 'ludens',
  description: 'ludens의 개발 기록, 회고, 독후감',
  url: 'https://poketopa.github.io',
  github: 'https://github.com/Poketopa',
} as const;

export const CATEGORY_LABELS = {
  Development: '개발',
  Retrospective: '회고',
  Books: '독후감',
} as const;

export type Category = keyof typeof CATEGORY_LABELS;
