# GOAL

## Active Goal — Batch-110 Fifty High-Quality Articles

### Final Deliverable
Create exactly 50 new Korean middle-aged-women health articles under `output/wonon/batch-110`, each independently researched, analyzed, drafted, and QA-scored at 95 or higher, then integrate them into the Next.js catalog and append 50 exact five-hour publication slots after the current final reservation.

### User Value
Readers receive distinct, source-backed decision tools instead of query-variation pages, while the site gains a durable 139-article catalog with controlled publication cadence.

### Required Features
- Full deduplication against all 89 current published/scheduled articles and the new 50 contracts.
- Per-article 3–5 research runs, 5–8 sources with official/primary preference, claim ledger, source dates, and at least two materially used article-specific details.
- At least 3,500 reader-visible Korean characters, 3–5 valid internal links, distinct structure/intro/H2/CTA, visible citations, and YMYL boundaries.
- Independent QA score >=95 with every hard gate boolean true; no score-only promotion.
- Five-article dry run before scale, then five-article checkpoint waves with independent review.
- Catalog/search/topic/JSON-LD/sitemap integration and 50 KST slots exactly five hours apart after 2026-08-26 00:00 KST.
- Tests, TypeScript, build, preview/production smoke, sitemap/GSC continuity, and durable handoff.

### Non-Goals
- Diagnosis, treatment choice, medication dosage, or personalized medical advice.
- Rewriting the existing 89 articles without a demonstrated gate failure.
- Template-based scaled-content generation or ranking guarantees.
- Credential, DNS, GA4, AdSense, or GSC property changes unrelated to the new sitemap URLs.

### Done Conditions
- Batch manifest exactly 50/50 `done`, minimum score 95, failed/review_needed 0.
- 50 complete draft/research/QA triplets and final corpus originality/provenance audit PASS.
- Unified catalog exactly 139 unique article slugs.
- New schedule begins 2026-08-26 05:00 KST and contains 50 exact five-hour gaps, ending 2026-09-05 10:00 KST.
- Future routes remain 404/noindex and absent from discovery until their slot.
- Local and Vercel builds, live route smoke, sitemap, RSS, and GSC sitemap continuity pass.

### User-Visible Result
Fifty independently useful health articles publish automatically one at a time every five hours after the existing queue, without leaking future content or lowering the 95-point editorial floor.

## Active Goal — GSC Sitemap Success And 95-Point Content Gate

- Final deliverable: confirm the site is Next.js or WordPress, submit `https://wonon.ehon365.kr/sitemap.xml` to the matching Google Search Console property through the Search Console API, and verify the API reports a completed sitemap with zero errors. Independently confirm published and scheduled editorial packets meet the requested minimum 95-point gate.
- User value: Google receives the canonical sitemap through an owned property, while low-quality or weakly evidenced content cannot silently enter the publication queue.
- Required features: secret-safe credential discovery under `D:\env`; property/permission match; live sitemap and robots validation; API submission and polling; durable non-secret evidence; independent corpus QA review.
- Non-goals: printing or editing credentials, changing DNS, deleting GSC properties, rewriting medical content without a concrete failed gate, or submitting unrelated domains.
- Done conditions: stack identified; matching property accessible; sitemap API state is non-pending with `errors=0`; live sitemap parses; corpus verifier finds no article below 95 or repairs and re-verifies failures; handoff and evidence updated.
- User-visible result: GSC Sitemaps shows the canonical sitemap as successful, and the editorial release gate remains at least 95.

## Final Deliverable

기존 원온 59편과 의미·검색의도·독자 작업이 겹치지 않는 중년여성 건강 콘텐츠 30편을 추가한다. 각 글은 공식·1차 출처 연구, 3,500자 이상의 독자용 한국어 본문, 내부 링크, 독립 QA 99점 증거를 갖추고 사이트에 통합된다. 현재 마지막 예약 시각인 2026-08-19 18:00 KST 이후부터 5시간 간격으로 자동 공개한다.

## User Value

독자는 중년 이후 건강 변화에서 무엇을 관찰하고 언제 의료진과 상의할지 구체적인 판단 도구를 얻는다. 사이트는 반복적인 대량 생성물이 아니라 서로 다른 문제·구조·근거를 가진 장기 검색 자산을 확보한다.

## Required Features

- 현재 59개 제목·slug·검색의도와의 의미 중복 및 카니벌라이제이션 차단
- 30개 Phase B+ 기사 계약과 독립 계약 감사
- 5편 다중 클러스터 드라이런 통과 후 5편 단위 집필·검증
- 글마다 공식·1차 출처 중심 research JSON, 독자용 출처 링크, 사실 추적성
- 독자에게 보이는 한국어 본문 3,500자 이상, 정확히 3개 이상의 유효 내부 링크
- QA 99점과 모든 hard gate 통과, UTF-8·반복 구조·문장 중복 검사
- 통합 카탈로그, 검색, 주제, sitemap, JSON-LD, 예약 공개 반영
- 기존 마지막 예약 다음부터 정확히 5시간 간격으로 30개 예약
- typecheck, tests, build, preview/production smoke 및 handoff 갱신

## Non-Goals

- 개인 진단·처방·복용량·자가치료 지시
- 기존 59편 본문 재작성
- 검증되지 않은 의료전문가 서명
- DNS·AdSense 콘솔·검색엔진 계정의 별도 설정 변경

## Done Conditions

- batch-60 manifest가 30/30 `done`, 각 99점, failed/review_needed 0
- 30개 draft/research/QA 파일과 전체 독립 감사 PASS
- 통합 후 총 89개 고유 article slug, 기존 동작 회귀 0
- 예약표가 기존 39개 뒤에 신규 30개를 5시간 간격으로 포함
- 테스트·TypeScript·프로덕션 빌드·diff check 통과
- 배포 후 현재 공개/미래 비공개 경계와 첫 예약 전환을 검증하거나 검증 예정 시각을 명시

## User-Visible Result

기존 공개 글과 예약 흐름은 유지되고, 검증된 신규 30편이 마지막 기존 예약 다음부터 5시간마다 한 편씩 자동 공개된다.
