# 원온 프로젝트 계획

## 제품과 독자

원온은 45~65세 한국 여성이 갱년기 전환, 수면, 체중·대사, 뼈·근력, 골반저, 검진과 마음 건강을 차분하게 이해하도록 돕는다. 각 문서는 핵심 요약, 오늘 할 수 있는 작은 행동, 신속한 진료가 필요한 신호, 공식 출처를 제공한다.

## 정보 구조

- 홈: 증상 탐색, 핵심 주제, 작은 루틴, 진료 경계, 최신 가이드
- 오늘의 변화: 갱년기·폐경 이행기와 증상 기록
- 몸의 리듬: 수면, 활동, 뼈·근력, 대사 건강
- 마음과 관계: 기분, 스트레스, 도움 요청
- 검진 가이드: 국가검진 확인과 진료 질문 준비
- 원온의 기준: 소개, 편집 원칙, 개인정보, 문의

## 콘텐츠 및 YMYL 원칙

- 질병관리청, WHO, ACOG, NHS 등 공식·일차 출처를 우선한다.
- 약물 용량, 개인별 치료 적합성, 건강기능식품 효능을 단정하지 않는다.
- 폐경 후 출혈, 흉통·호흡곤란, 신경학적 이상, 자해·자살 생각 등은 즉시 진료 경계로 안내한다.
- 실제 검토자가 없는 콘텐츠는 `의료전문가 검토 예정`으로 투명하게 표시한다.
- 초기에는 6~8개 큐레이션 문서만 공개하며 대량 pSEO는 사용하지 않는다.

## 기술 구조

- Next.js App Router + TypeScript, 서버 렌더링 중심
- 정적 콘텐츠 데이터와 동적 글 라우트
- CSS 변수 기반 모바일 우선 디자인, 최소 44px 터치 영역
- `metadata`, canonical, Open Graph, WebSite/Organization/Article JSON-LD
- robots, sitemap, RSS, manifest, ads.txt
- GA4와 AdSense Auto ads는 루트 레이아웃에 삽입

## 배포와 도메인

- GitHub 저장소: `lsk7209/wonon-health` 목표
- Vercel 프로젝트: `wonon-health`
- production domain: `wonon.ehon365.kr`
- DNS: ChemiCloud 1번 서버의 `ehon365.kr` 영역에 Vercel이 요구하는 신규 `wonon` 레코드만 추가
- 빌드: `npm run build`
- 롤백: Vercel 직전 배포 promote 또는 새 도메인 매핑 제거; DNS는 신규 `wonon` 레코드만 제거

## 역할 라우팅

- Leader: 하네스, 공유 문서, Git/Vercel/DNS, 통합과 최종 검증
- Explore: 로컬·SSH·배포 환경의 읽기 전용 탐색
- Researcher: 공식 건강 근거와 YMYL 경계
- Designer: 브랜드, IA, 접근성, 모바일 UX
- Executor: `app/**`, `components/**`, `content/**`, `public/**` 구현
- Verifier/Critic: 빌드 후 별도 검증과 위험 검토

## 출시 검증

- 로컬 설치/타입/빌드
- 내부 링크, 출처, placeholder, metadata, structured data 검사
- Vercel 프로젝트 및 도메인 상태
- 공개 DNS CNAME/A 응답
- 홈페이지, 핵심 글, 정책, robots, sitemap, ads.txt HTTP 상태
- 모바일 브라우저 스모크와 콘솔 오류 확인
