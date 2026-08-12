# ludens.dev

개발하고, 읽고, 돌아보며 남기는 Ludens의 기록입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 글 쓰기

`src/content/posts` 폴더에 Markdown 파일을 추가합니다.

```md
---
title: "글 제목"
description: "글 요약"
publishedAt: 2026-08-13
category: Development
tags: [Astro, TypeScript]
draft: false
---

본문을 작성합니다.
```

`category`는 `Development`, `Retrospective`, `Books` 중 하나를 사용합니다. `draft: true`인 글은 공개 빌드에서 제외됩니다.

## 검증

```bash
npm run check
npm run build
```

`main` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages에 자동 배포합니다.
