# PLAN

## Classification

- Size: large
- Domain Profile: adsense-audit + YMYL health editorial

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
