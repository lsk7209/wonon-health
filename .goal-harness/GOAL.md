# GOAL

## Final Deliverable

`https://wonon.ehon365.kr`에서 동작하는 한국어 중년여성 건강 정보 사이트 "원온"을 Next.js로 구축하고 Vercel에 배포한다. ChemiCloud 1번 서버의 `ehon365.kr` DNS 영역에 Vercel 연결 레코드를 추가하고 공개 경로를 검증한다.

## User Value

45~65세 한국 여성이 갱년기, 수면, 뼈·근력, 검진, 마음 건강 정보를 과장 없이 이해하고 의료상담이 필요한 신호와 다음 행동을 구분할 수 있다.

## Required Features

- 모바일 우선 반응형 홈, 주제 탐색, 검색 진입점
- 최소 6개의 출처 기반 핵심 콘텐츠와 명확한 YMYL 고지
- 소개, 편집 원칙, 개인정보처리방침, 문의 페이지
- metadata, canonical, JSON-LD, robots, sitemap, RSS, ads.txt
- GA4 `G-3NJ07LPVXD` 및 AdSense Auto ads `ca-pub-3050601904412736` 기반
- Git 저장소, Vercel 프로젝트, `wonon.ehon365.kr` 도메인 연결
- 로컬 빌드와 공개 URL 상태·크롤러 경로 검증

## Non-Goals

- 개인 진단, 처방, 약물·건강기능식품 추천
- 의료전문가 검토가 완료되지 않은 상태를 완료된 검토처럼 표시
- AdSense 승인 또는 검색 노출을 보장
- 대량 자동 생성 글 게시

## Done Conditions

- `npm run build` 성공
- 주요 페이지와 크롤러 파일이 공개 도메인에서 HTTP 200
- Vercel에서 `wonon.ehon365.kr`이 유효한 production domain으로 확인
- DNS 레코드가 공개 조회에서 Vercel 대상으로 확인
- 하네스, manifest, handoff에 변경·검증·롤백이 기록

## User-Visible Result

방문자는 원온 브랜드 홈에서 증상·생활·검진 주제를 탐색하고, 근거 출처 및 진료 경계가 표시된 콘텐츠를 읽을 수 있다.
