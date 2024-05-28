# Headless CMS 프로젝트 - WordPress, GraphQL, Next.js

## 개요

- Next.js App Router
- urql GraphQL 클라이언트
- Cloudflare Pages
- WP GraphQL (워드프레스 서버)

## 시작하기

`.env`파일 생성 후 npm run dev:watch로 next 개발 서버 실행

```shell
cp .env.sample .env
npm run dev:watch
```

### `.env` 환경변수 값

- WORDPRESS_ENDPOINT
  - wp.fonts.and.guide/graphql
- BASIC_AUTH
  - [WP-API/Basic-Auth](https://github.com/WP-API/Basic-Auth) 플러그인 활용하여 워드프레스 계정의 username, password로 반영

### Local WP 등 로컬 워드프레스 서버와 연동이 필요한 경우

`.env` 파일의 WORDPRESS_ENDPOINT를 로컬 주소로 변경 후 dev:watch 스크립트 실행

## 배포하기

해당 저장소의 main 브랜치에 커밋이 푸시되면 Cloudflare Pages로 배포 자동화
