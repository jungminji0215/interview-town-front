# 면접 타운 (Interview Town)

## 프로젝트 개요

면접 타운은 개발자들의 면접 준비를 돕기 위해 질문을 모아보고, 답변을 공유하는 플랫폼입니다.

면접 준비를 할 때 매번 질문 리스트를 정리하는 번거로움을 해소하고싶었고, 다른 사람들은 어떻게 답변을 준비하는지 항상 궁금했습니다. 이를 해결해보고자 면접 타운을 만들어보았습니다. 🥳

🔗 [배포 링크](https://www.interview-town.com)

## 기술 스택

- **Frontend** : Next.js 15 App Router, React, Tailwind CSS 
- **Backend** : Express, Prisma, MySQL, AWS RDS, AWS Route 53 
- **배포** : 프론트엔드: Vercel / 백엔드: AWS EC2 + ELB 
- **툴** : Git, WebStorm, ESLint, Prettier 

## 아키텍처

![아키텍처](/public/docs/architecture.png)

- 프론트엔드는 Vercel에 배포되고, 서버는 AWS ELB → EC2(Express 서버) → RDS(MySQL)로 흐름
- ELB를 통해 SSL/TLS 적용

## 디렉토리 구조

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

## 기능

- 질문 목록 페이지
  - 질문 리스트 조회 
- 질문 상세 페이지
  - 답변 조회
  - 답변 등록

## 추가 예정 기능

- 사용자 인증
- 마이페이지