export const SITE = {
  title: 'ludens.dev',
  author: 'Ludens',
  description: '개발하고, 읽고, 돌아보며 남기는 기록',
  url: 'https://poketopa.github.io',
  github: 'https://github.com/Poketopa',
} as const;

export const CATEGORY_LABELS = {
  Development: '개발',
  Retrospective: '회고',
  Books: '독후감',
} as const;

export type Category = keyof typeof CATEGORY_LABELS;
