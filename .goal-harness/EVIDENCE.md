# EVIDENCE

## Validation Level

Level: 3

## Commands Run

| Command | Result | Notes |
|---|---|---|
| harness-init.py | PASS | size=large, domain=adsense-audit, created=2026-08-11T09:17:05+09:00 |
| ssh kang4 | PASS | Connected to server-1 shared account |
| uapi DNS parse_zone zone=ehon365.kr | SAFE FAIL | Account does not control this zone; no mutation |
| Resolve-DnsName ehon365.kr -Type NS | PASS | ns1 through ns4.hosting.co.kr |
| npm install | PASS | 30 packages, 0 vulnerabilities |
| npm run build | PASS | TypeScript and 22 static pages |
| project-stack-audit.py | PASS | Next.js/npm/Vercel, zero warnings/errors |
| ga4-auto-setup.py --inject | PASS | `G-3NJ07LPVXD` configured |
| adsense-auto-setup.py --inject --ads-txt | PASS | Auto ads and ads.txt configured |
| gh repo create/push | PASS | `lsk7209/wonon-health`, commits `ad2ad17` and `58f5f16` |
| vercel --prod | PASS | deployment `dpl_CDrE5eWBFxcVgQtufV7dXSoXqH6a`, 22 pages |
| vercel domains add/inspect | ACTION REQUIRED | exact record `A wonon.ehon365.kr 76.76.21.21` |
| public Vercel route smoke | PASS | home, articles, trust, robots, sitemap, ads.txt all HTTP 200 |
| canonical audit | FAIL then FIXED | per-route self canonicals added in `58f5f16` and redeployed |
| custom domain DNS | BLOCKED | NXDOMAIN; server-1 account does not control zone |

### 2026-08-11 09:42 KST - Third blocker audit

- `Resolve-DnsName wonon.ehon365.kr`: no A answer / NXDOMAIN.
- `curl https://hosting.co.kr`: connection timed out again.
- `vercel domains inspect wonon.ehon365.kr`: domain mapping exists, configuration remains invalid, exact required record remains `A wonon.ehon365.kr 76.76.21.21`.
- Conclusion: No meaningful in-scope progress is possible without authenticated authoritative DNS access; objective remains incomplete.

## Test Results

| Test | Result | Notes |
|---|---|---|

## Failed Checks

## Fixes Applied

## Completion Evidence

### 2026-08-11 10:14 KST - Site-development increment

| Check | Result | Evidence |
|---|---|---|
| `npm run build` | PASS | Next.js 16.3.0 compiled and generated 24 static pages, including `/search` |
| `npx tsc --noEmit` | PASS | No TypeScript errors |
| `git diff --check` | PASS | No whitespace errors; only Windows line-ending notices |
| Search experience | IMPLEMENTED | Keyword input, five quick filters, live result count, empty state, topic fallbacks |
| Symptom-led guide | IMPLEMENTED | Four private client-side paths, explicit non-diagnostic label, urgent-care warning |
| Article depth | IMPLEMENTED | Per-article key takeaways, today checklist, and three clinician questions for all six articles |
| Mobile navigation | IMPLEMENTED | Search remains visible; essential links retain 44px targets; compact 410px layout |

DNS verification is intentionally excluded from this increment at the user's direction.

### 2026-08-11 10:24 KST - Deployed verification

- Vercel deployment `dpl_3gZ71FDrxZ7cYkutYnmmFD6iBzyV`: READY; 24 static pages generated.
- `https://wonon-health.vercel.app/`, `/search`, two representative article routes, `/robots.txt`, and `/sitemap.xml`: HTTP 200.
- Independent verifier found the legacy mobile selector hiding Search; selector repaired in commit `1b3adf7`, then build and typecheck passed again.

### 2026-08-11 11:08 KST - High-quality editorial pilot

- `a007` women-specific sleep-apnea draft: 3,609 reader-visible Korean characters, 7 H2 sections, 3 internal links, and 6 official sources.
- Independent editorial QA initially failed length, claim-ledger, and heading gates; all three were repaired.
- Final editorial QA: PASS, 94/100, zero hard-gate failures; research/QA/manifest JSON parse successfully.
- Local `npm run build`: PASS, 24 static pages. `npx tsc --noEmit`: PASS.
- Draft publication, medical-expert sign-off, AdSense operations, and DNS changes were deliberately not performed.

### 2026-08-11 12:05 KST - Three-article content subgoal complete

| Article | Visible Korean characters | Sources / runs | Internal links | QA |
|---|---:|---:|---:|---:|
| a007 women-specific sleep-apnea signals | 3,609 | 6 / 3 | 3 | PASS 94 |
| a008 GSM three-zone symptom map | 3,515 | 6 / 4 | 3 | PASS 93 |
| a009 DXA result-report reading | 3,949 | 6 / 4 | 3 | PASS 94 |

- Independent batch critic: PASS for title, intro, H2/structure, CTA variation, existing-content non-overlap, people-first value, and YMYL boundaries.
- All research, QA, and manifest JSON files parse successfully.
- `npm run build`: PASS with 24 static pages. `npx tsc --noEmit`: PASS. `git diff --check`: PASS.
- Drafts were not integrated or published; DNS and AdSense account operations were not touched.
# 2026-08-11 Long-form integration checkpoint

- `npm run build`: PASS, 27 static pages including nine article routes.
- `npx tsc --noEmit`: PASS.
- `git diff --check`: PASS (line-ending notices only).
- Generated HTML checks: all three new routes contain `.longform-content`, a semantic `<table>`, and `application/ld+json`.
- Vercel deployment intentionally deferred until the current content checkpoint is integrated and reviewed.

## Production preview deployment

- Risk notice: user explicitly requested generated articles be reflected on the site; scope was limited to the existing Vercel project. Rollback is the prior READY deployment `dpl_3gZ71FDrxZ7cYkutYnmmFD6iBzyV`. DNS records were not changed.
- Vercel deployment `dpl_7ZT5yEMXnFg6dEWSRiuQpUtwe2XG`: READY, remote build generated 27 pages.
- `https://wonon-health.vercel.app` smoke: all three new article URLs return HTTP 200 and contain long-form markup, tables, and JSON-LD.
- `/articles` and `/sitemap.xml`: HTTP 200 and contain all three slugs.
- Independent review repair: corrected `원온` brand labels; each long-form JSON-LD now contains six citations; search payload contains long-form discovery terms including `수면검사` and `유방암`.
