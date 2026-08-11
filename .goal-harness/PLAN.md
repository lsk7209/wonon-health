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
