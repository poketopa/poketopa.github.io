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
