# 🏙️ 면접 타운 (Interview Town)

## 📖 프로젝트 개요

면접 타운은 개발자들의 면접 준비를 돕기 위해 질문을 모아보고, 답변을 공유하는 플랫폼입니다.

면접 준비를 할 때 매번 질문 리스트를 정리하는 번거로움을 해소하고싶었고, 다른 사람들은 어떻게 답변을 준비하는지 항상 궁금했습니다. 이를 해결해보고자 면접 타운을 만들어보았습니다. 🥳

🔗 https://www.interview-town.com

## 🛠️ 기술 스택

| 역할    | 기술                          |
|-------|-----------------------------|
| 프레임워크 | Next.js v15(App Router)     |
| 언어    | Typescript                  |
| 상태 관리 | Context Api, Tanstack Query |
| 스타일링  | TailwindCSS v4              |
| 배포    | Vercel                      |

## 📂 디렉토리 구조

```
📦src
 ┣ 📂api
 ┣ 📂app
 ┃ ┣ 📂(with-layout)
 ┃ ┃ ┗ 📂questions
 ┃ ┃ ┃ ┣ 📂[category]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂questions
 ┃ ┃ ┗ 📂[category]
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┣ 📜robots.ts
 ┃ ┗ 📜sitemap.ts
 ┣ 📂components
 ┃ ┣ 📂skeleton
 ┃ ┣ 📂ui
 ┣ 📂constants
 ┣ 📂providers
 ┣ 📂types
 ┗ 📂utils
```

## 🚀 기능 요약

- 인덱스 페이지
  - 서비스 진입 페이지이며, SSG 로 구성하였습니다.
- 질문 목록 페이지
  - ISR 
  - 질문 리스트를 조회할 수 있습니다.
- 질문 상세 페이지
  - 답변 조회
  - 답변 등록

## 🏃‍♀️ 추가 예정 기능

- 사용자 인증