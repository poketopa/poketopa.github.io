# homoludens

개발 기록, 회고, 독후감을 담는 블로그입니다.

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

이미지 아래에 캡션을 표시하려면 이미지를 별도 문단에 놓고, 경로 뒤에 큰따옴표로 설명을 적습니다. 대괄호 안에는 스크린리더용 대체 텍스트를 적습니다.

```md
![녹음 파일을 복구한 화면](/images/example.png "복구 후 다시 확인한 녹음 목록")
```

## 검증

```bash
npm run check
npm run build
```

`main` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages에 자동 배포합니다.

## English edition

Korean URLs remain unchanged. English pages live under `/en/`; the header links
switch between the same page in each language. Article Markdown lives in
`src/content/posts-en/`, using exactly the same filenames as
`src/content/posts/`. Translate the title, description, prose, and image alt text;
keep dates, category, tag identifiers, links, images, fenced code, and inline
code identifiers intact. Translate ordinary quotations and prose even when they
are styled with inline backticks. Preserve language-specific example literals
with an English explanation where needed.
Preserve heading count and order so shared anchors remain valid. Korean tag
identifiers keep category filtering and counterpart URLs stable.

Shared page components render both editions. `scripts/localize-en.mjs` localizes
presentation labels and internal navigation at build time. Preview the production
build (`npm run build && npm run preview`) to test the final English UI.
No translation service is contacted by the deployed site or normal builds.

Run `npm run build` before publishing. The build runs type checks, translation
coverage and preservation checks, then checks generated routes, RSS, anchors,
and interactive search, filters, pagination, and bookshelf/list switching. When adding or changing a post,
update both editions together; the verification scripts check full coverage,
code preservation, English routes, and links.

All 172 English articles received a separate source-comparison review by
GPT-6.1 Sol at medium reasoning effort. The file hashes, review corrections, and
preserved source caveats are recorded in `resources/translations/review.json`.
Images and executable code remain in their original form, including Korean text
inside screenshots and code comments.
