# ACCEPTANCE

| Criterion | Status | Evidence |
|---|---|---|
| User can open a polished responsive Korean homepage | pass-preview | Browser visual/DOM smoke on `wonon-health.vercel.app` |
| User can reach at least 6 sourced health guides and trust pages | pass-preview | 6 article routes plus About, Editorial, Privacy, Terms, Contact return 200 |
| Medical content shows limitations, urgent signals, sources, and review status honestly | pass | Explicit `의료전문가 검토 전`, source boxes, disclaimer |
| `npm run build` completes successfully | pass | 23 static pages, TypeScript passed |
| Robots, sitemap, canonical, metadata, JSON-LD, GA4 and ads.txt are configured | pass-code | Per-route canonical repair verified; custom host pending DNS |
| GitHub source and Vercel production deployment exist | pass | `lsk7209/wonon-health`; deployment `dpl_9fwY6Gk4kQgkxfYJdjg5WutPy2UC` |
| `wonon.ehon365.kr` resolves to the Vercel deployment | fail-blocked | NXDOMAIN; authoritative DNS access unavailable |
| Public custom-domain routes respond successfully | fail-blocked | DNS not configured |
| Existing `ehon365.kr` DNS records are preserved | pass | No DNS mutation performed; exact new record plan prohibits apex/www changes |
| Durable handoff contains current state, validation, side effects and rollback | pass | `docs/HANDOFF.md` |
