## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 8/21 추가 내용

next.js 최신버전 앱 생성 및 앱라우터 방식으로 변경

## 8/22 추가 내용

메인화면 UI 구현

입력 폼 구현

페이지 라우팅 처리

## 8/25 추가 내용

react-big-calender 라이브러리를 이용해 캘린더 구현

TeaLounge 메뉴 - 캘린더

## 8/26 추가 내용

고객 사례 - 모달창 구현

메인화면 구현
(특정 페이지 컴포넌트 제외 설정)

header-nav 기본적인 경로 페이지 설정

## 8/27~28 추가 내용

블로그 페이지 네이션 구현

데이터 베이스 x

## 8/28 추가 내용

PostgreSQL(DB) 과 Prisma(ORM)를 사용해 연동

필요한 라이브러리들 설치 및 초기 셋팅

```bash
- 설치 및 실행

brew install postgresql
brew services start postgresql

- ORM 도구 설치

npm install prisma @prisma/client

- JS 라이브러리 설치

npm install postgres

- prisma 초기화

npx prisma init

- prisma 마이그레이션을 실행하여 데이터베이스 테이블 생성

npx prisma migrate dev --name init

(schema.prisma 파일 → 실제 데이터베이스 테이블)

- prisma clien 생성

npx prisma generate
```

schema.prisma → 모델 생성

API 엔드포인트 설정 및 간단한 데이터 생성( + 예외처리)

테스트

## 8/29 추가 내용

prisma studio를 이용해 데이터 추가

테이블 데이터 조회기능 추가 (prisma-findMany)

기존 페이지네이션 기능에 데이터 추가

## 9/1~2 추가 내용

서버 액션 기능 추가 (redirect)

입력폼 스키마 생성(Prisma) 및 반영

searchParams를 사용해 redirect 쿼리 파라미터 상태별로 메시지 표시(성공, 에러, 유효성)

폼 입력 후 버튼 클릭 시 DB저장

## 9/3 추가 내용

글쓰기 테이블(모델) 생성 및 스키마 반영 - prisma

글쓰기 페이지 라우팅 설정 - 글쓰기 버튼 클릭 시 글쓰기 페이지 이동

블로그 글쓰기 페이지 폼 구현

작성하기 버튼 클릭 시 DB저장 -> 블로그 페이지로 redirect

TailWindCSS 설치 및 shadcn 적용

간단한 블로그 페이지 UI 및 글쓰기 폼 페이지 UI 구현
