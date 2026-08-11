# PLAN

## Classification

- Size: large
- Domain Profile: seo-content-batch + YMYL health editorial

## Active Increment: Additional Thirty Articles

### Phase A — Inventory and contract map

- Objective: Lock 30 non-overlapping reader problems against all 59 existing articles.
- Tasks: Export current titles/slugs/contracts; research topic gaps; create full Phase B+ rows; run deterministic and independent audits.
- Expected Files: `output/wonon/batch-60/manifest.json`, contract map, validator, audit notes.
- Completion Criteria: 30 accepted rows, no placeholder/template/semantic-overlap blockers.
- Test Point: UTF-8, exact row counts, duplicate signatures, human critic review.
- Rollback/Recovery: Repair or replace contracts; no prose starts while blocked.

### Phase B — Five-article dry run

- Objective: Prove research, writing, structure variation, and QA quality before scaling.
- Tasks: Select five articles across at least three clusters; create draft/research/QA; independently audit and repair.
- Expected Files: Five packet triplets and dry-run report.
- Completion Criteria: Five rows at 99/done, all hard gates pass, no template signals.
- Test Point: Length, source traceability, URLs, internal links, prose overlap.
- Rollback/Recovery: Repair the contract/process before article six.

### Phase C — Remaining twenty-five articles

- Objective: Complete five independently checked waves.
- Tasks: Research, draft, QA, repair, and checkpoint audit every five rows.
- Expected Files: 30 total packet triplets plus corpus audit.
- Completion Criteria: 30/30 at 99/done; failed/review_needed 0.
- Test Point: Window-five audits and final full-corpus audit.
- Rollback/Recovery: Pause any wave after repeated failure; repair cause before continuing.

### Phase D — Integration and scheduling

- Objective: Add all approved articles to every discovery surface and append 30 exact five-hour slots.
- Tasks: Integrate catalog; update schedule/code/docs/tests; verify direct-route privacy.
- Expected Files: content loader/catalog/schedule/tests/docs changes.
- Completion Criteria: 89 unique catalog items; existing behavior preserved; exact schedule equivalence.
- Test Point: Tests, typecheck, build, static/runtime route audit.
- Rollback/Recovery: Revert integration commit or promote previous Vercel deployment.

### Phase E — Independent verification and release

- Objective: Prove corpus quality and live scheduling behavior.
- Tasks: Code/content review, preview, production deployment, current/future smoke, durable handoff.
- Expected Files: final audit, review, evidence, handoff.
- Completion Criteria: All acceptance rows pass or an external-time verification is explicitly pending.
- Test Point: Live HTTP, listing, sitemap, JSON-LD, schedule boundary.
- Rollback/Recovery: Vercel deployment promotion plus normal Git revert.

## Phase 1 — Discovery and launch contract

- Objective: Confirm local, SSH, DNS, Vercel, and content constraints.
- Tasks: Inspect workspace and auth; normalize brief; research official sources; define UX and acceptance.
- Expected Files: `docs/site-brief.md`, `docs/project-plan.md`, `.goal-harness/*`.
- Completion Criteria: Brief/plan gates pass and exact external actions are recorded.
- Test Point: SSH connectivity, DNS NS lookup, Vercel identity.
- Rollback/Recovery: Read-only; preserve evidence in handoff.

## Phase 2 — Local implementation

- Objective: Build the complete launch MVP.
- Tasks: Implement pages/content/SEO/trust/analytics; initialize Git; validate source and link integrity.
- Expected Files: `app/**`, `components/**`, `content/**`, configuration files.
- Completion Criteria: No known build blocker or unsafe medical claim; local build passes.
- Test Point: TypeScript/build, static audits, representative page smoke.
- Rollback/Recovery: Git commit before external launch.

## Phase 3 — Deploy and domain

- Objective: Publish on Vercel and connect `wonon.ehon365.kr`.
- Tasks: Create GitHub/Vercel project; deploy; add Vercel domain; add DNS record on server 1 control plane.
- Expected Files: deploy/DNS evidence and updated manifest.
- Completion Criteria: Vercel reports domain configured; public DNS resolves.
- Test Point: Vercel inspect/domain list and DNS lookup.
- Rollback/Recovery: Remove only the new subdomain record/domain mapping; retain prior DNS.

## Phase 4 — Production verification and handoff

- Objective: Prove crawlability, UX, and durable continuation.
- Tasks: HTTP/browser smoke, crawler audit, manifest/report/handoff, risk review.
- Expected Files: `docs/production-health.json`, `docs/HANDOFF.md`, `docs/launch-report.md`.
- Completion Criteria: Acceptance table is complete and state is DONE or accurately blocked.
- Test Point: Public homepage, robots, sitemap, content and policy URLs return expected results.
- Rollback/Recovery: Vercel rollback/deployment promotion and DNS record removal instructions recorded.

## Phase 5 — Thirty-article contract map and dry run

- Objective: Lock thirty non-overlapping reader problems before writing prose.
- Tasks: Compare all published and prior batch titles; create thirty complete contracts; run strict planning audit; independently challenge the map; complete and verify a five-article dry run.
- Expected Files: `output/wonon/batch-30/manifest.json`, title-contract map, planning audit, five draft/research/QA packets.
- Completion Criteria: Exactly thirty accepted rows, strict audit warnings zero, dry-run five independently pass at 99.
- Test Point: Manifest planning audit plus contract and prose similarity checks.
- Rollback/Recovery: Repair or replace weak contracts; do not scale drafting while a gate fails.

## Phase 6 — Remaining twenty-five articles

- Objective: Produce the remaining articles in independently audited five-article checkpoints.
- Tasks: Research, draft, QA, repair, and promote only passing rows.
- Expected Files: Thirty total draft/research/QA packets and final corpus report.
- Completion Criteria: 30 done at 99, zero failed/review rows, full anti-template and source audit passes.
- Test Point: Rolling window-5 and window-20 strict audits, full UTF-8/link/source/overlap check.
- Rollback/Recovery: Stop the affected wave, repair the repeated failure, and re-audit before continuing.

## Phase 7 — Five-hour automatic release integration

- Objective: Make release timing automatic and consistent across every public discovery surface.
- Tasks: Record KST `publishedAt` values; gate direct routes, listings, search, topics, sitemap, and structured data; add deterministic time-boundary tests.
- Expected Files: content schedule, scheduling utilities/tests, route/catalog changes.
- Completion Criteria: Existing public baseline remains available; each future article is hidden before and visible after its timestamp without a manual redeploy.
- Test Point: Frozen-time tests, typecheck, build, generated/runtime route checks.
- Rollback/Recovery: Revert to the previous production deployment and retain the schedule artifact for repair.

## Phase 8 — Deploy and live verification

- Objective: Publish the verified scheduler and scheduled content safely.
- Tasks: Commit/push, Vercel production deploy, live current/future boundary checks, update handoff/evidence.
- Expected Files: deployment evidence and current handoff.
- Completion Criteria: READY deployment; live public/future behavior matches schedule; DNS unchanged.
- Test Point: HTTP status, article counts, sitemap/search/topic visibility, JSON-LD.
- Rollback/Recovery: Promote the prior Vercel deployment; no DNS rollback is needed.
