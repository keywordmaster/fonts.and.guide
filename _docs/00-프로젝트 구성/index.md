---
title: 프로젝트 구성
---

## 왜 Faust.js(Apollo GraphQL client)에서 갈아탔나요?

- 기존 Faust.js의 경우 Apollo client를 랩핑한 형태인데, app router에서 쓰기 애매함
  - 제공되는 기능이 좀 있긴한데, page router와 혼용해서 써야될 것으로 보입니다.
  - [apollographql/apollo-client-nextjs: Apollo Client support for the Next.js App Router](https://github.com/apollographql/apollo-client-nextjs)
- Cloudflare Pages에 배포를 위해 더 경량화된 클라이언트를 사용해보기
  - [Comparison | urql Documentation](https://commerce.nearform.com/open-source/urql/docs/comparison/#core-features)

## Step by step

### urql 예제 저장소부터 시작

[tiged](https://github.com/tiged/tiged)를 활용한 예제 저장소 복사

```shell
npx tiged urql-graphql/urql/examples/with-next next-urql-tutorial
```

#### urql 참고자료

- [Overview | urql Documentation](https://commerce.nearform.com/open-source/urql/docs/)
- [Server-side Rendering | urql Documentation](https://commerce.nearform.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs)
- [urql/examples/with-next at main · urql-graphql/urql](https://github.com/urql-graphql/urql/tree/main/examples/with-next)

### WordPress와 GraphQL

#### 로컬 환경 워드프레스 서버 설치

- [.zip 파일 받기](../../headless-test.local.zip)
- Local WP를 활용하여 로컬 워드프레스 서버 설치
- `cp .env.sample .env`로 `.env`을 만들어줍니다.
  - 추후 코드젠 CLI `graphql-codegen -w --require dotenv/config`의 [codegen.ts](../../codegen.ts) 및 urql client에서 사용하는 환경 변수 반영을 위해 필요합니다.

#### 설치된 플러그인

- WPGraphQL
<!-- TODO: 플러그인 목록 작성하기 -->

#### 왜 WordPress에서 GraphQL을 사용하나요?

- REST API를 사용할 수도 있지만...
  - 그냥 GraphQL 찍먹해보기
    - [WPGraphQL vs. WP REST API](https://www.wpgraphql.com/docs/wpgraphql-vs-wp-rest-api)

### graphql codegen 설치

```shell
npm i -D @graphql-codegen/cli @parcel/watcher @graphql-codegen/client-preset concurrently
```

- Typescript의 도움을 받기 위해
- 작성한 gql 쿼리의 리턴 타입을 자동 생성
- `npm run dev:watch` 실행시 watch모드로 변경된 내용 자동 생성되게 반영
  - [package.json](../../package.json)에서 `dev` scripts 명령어를 `concurrently \"next dev\" \"npm run codegen\"`로 변경
    - [Development workflow (GraphQL-Codegen)](https://the-guild.dev/graphql/codegen/docs/getting-started/development-workflow#watch-mode)
- 그 외 `codegen` 및 `codegen:watch` 참조

#### GraphQL codegen 참고자료

- [Quick Start (GraphQL-Codegen)](https://the-guild.dev/graphql/codegen/docs/getting-started/installation)
- [Client preset (GraphQL-Codegen)](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client)
  - [Client preset - persisted-documents](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#persisted-documents)

### IDE에서 gql 쿼리 자동완성 가능하게 설정하기

graphql-config 설치 및 [설정 파일](../../graphqlrc) 추가

```shell
npm i -D graphql-config
```

#### graphql-config 참고자료

- [Home (GraphQL-Config)](https://the-guild.dev/graphql/config)

#### VS Code 추천 익스텐션

<details>
<summary>
보기
</summary>
Name: GraphQL
Id: mquandalle.graphql
Description: Syntax highlighting for GraphQL queries and schemas
Version: 0.1.2
Publisher: Maxime Quandalle
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=mquandalle.graphql

Name: GraphQL: Inline Operation Execution
Id: GraphQL.vscode-graphql-execution
Description: Execute graphql operations from your code (revived!)
Version: 0.2.6
Publisher: GraphQL Foundation
VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-execution>

Name: GraphQL: Language Feature Support
Id: GraphQL.vscode-graphql
Description: GraphQL LSP extension that adds autocompletion, validation, go to definition, hover, outline and more.
Version: 0.9.3
Publisher: GraphQL Foundation
VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql>

Name: GraphQL: Syntax Highlighting
Id: GraphQL.vscode-graphql-syntax
Description: Adds syntax highlighting support for .graphql & embedded support for javascript, typescript, vue, markdown, python, php, reason, ocaml and rescript
Version: 1.3.6
Publisher: GraphQL Foundation
VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax>

</details>

### ESLint 및 Prettier

- Next 린트 룰 사용
- simple-import-sort

```shell
npm run lint -- --fix && npm run format
```

- lint-stage 활용하여 프리커밋 훅 필요할지?

### Tailwind CSS 설치

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [Install Tailwind CSS with Next.js - Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)

### shadcn/ui 설치

```shell
npx shadcn-ui@latest init
```

- [Next.js - shadcn/ui](https://ui.shadcn.com/docs/installation/next)

<!-- TODO: 따로 분리하기? -->

## 실습해보기

### 워드프레스 사이트 정보

### 워드프레스 메뉴 쿼리

### 워드프레스 사이트의 페이지 혹은 카테고리 계층 구조 쿼리

## Cloudflare Pages 배포 방법

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [next-on-pages](https://github.com/cloudflare/next-on-pages) CLI 라이브러리 활용하여 Pages배포용 빌드 진행

### Wrangler를 활용한 로컬 개발 환경

```shell
npm i -D @cloudflare/next-on-pages @cloudflare/workers-types eslint-plugin-next-on-pages vercel wrangler
```

- [Full-stack deployment · Cloudflare Pages docs](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/#recommended-development-workflow)

```shell
npm run preview
```

위 명령어로 이상 없이 빌드 및 실행이 되는 경우 배포 진행하기

### ~~Github Action 활용하기~~

> 해당 프로젝트에서는 활용하지 않습니다

[cloudflare/wrangler-action: 🧙‍♀️ easily deploy cloudflare workers applications using wrangler and github actions](https://github.com/cloudflare/wrangler-action)

### Wrangler 활용하기

> 해당 프로젝트에서는 활용하지 않습니다

Wrangler는 [클라우드플레어 제품군](https://developers.cloudflare.com/) 중 Developer products에 해당하는 제품을 CLI로 제어할 수 있는 도구 입니다.

```shell
npm run deploy
```

`npx wrangler whoami`에서 조회되는 클라우드플레어 계정으로 프로젝트를 배포합니다. 기존에 배포된 내역이 없는 경우 새 프로젝트를 생성하는 단계부터 시작합니다.

#### Wrangler CLI 참조

- [Commands - Wrangler · Cloudflare Workers docs](https://developers.cloudflare.com/workers/wrangler/commands/)

### 클라우드플레어 대시보드에서 저장소 연동하기

#### 클라우드플레어 가입

#### 대시보드에서 Workers & Pages 메뉴로 이동

#### Create application

#### Pages 탭에서 Connect to Git 진행

깃헙 계정을 연동하는 과정 이후 깃헙 계정의 저장소 중 하나를 선택하여 빌드 경로 선택 등 배포 설정을 완료 할 수 있습니다.

### Pages 배포 설정 주의사항

- 환경 변수 문자열 잘 확인하기
- nodejs_compatible 플래그 설정 필요

### Pages로 Next.js 배포시 단점

- Vercel의 최적화 및 기능 일부를 사용할 수 없음
  - 이미지 최적화
  - 폰트?
  - 캐시
  - 크론
  - 빌드 캐시 (Turbopack)
- [next-on-pages/packages/next-on-pages/docs/supported.md at main · cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md#build-output-configuration)
