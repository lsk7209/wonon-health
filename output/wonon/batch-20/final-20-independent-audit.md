# Final 20-article independent audit

Audited: 2026-08-11 KST (post-repair re-audit)  
Scope: `output/wonon/batch-20/{manifest.json,drafts,research,qa}`. No article, research packet, QA packet, manifest, or site file was modified by this audit.

## Verification Report

### Summary

**Status**: PASS  
**Confidence**: High

The repair slice resolves both prior blockers. `b005` now registers S7 with full provenance and its URL is reader-visible and returns HTTP 200. After removing front matter, HTML, Markdown links/URLs, and CSS before semantic tokenization, the four prior exact seven-token overlaps are absent and no new cross-20 exact seven-token overlap exists.

### Fresh evidence reviewed

- JSON: Python UTF-8 `json.load` parsed the manifest and all 20 research/QA packets. Manifest stats are `total=20`, `done=20`, `failed=0`, `review_needed=0`.
- Score gates: every manifest row is `done` at 99; every QA category set recomputes to 99; all 20 `hard_gate_results` sets pass.
- UTF-8 and body length: all drafts contain zero U+FFFD replacement characters and zero forbidden C0/C1 controls. Conservative semantic Hangul counts (front matter, markup, links, URLs, and CSS excluded) range from 3,535 to 4,318; all exceed 3,500.
- Links and traceability: each draft has exactly 3 `/article/` links and `manifest.internal_link_count=3`. Every reader-visible external citation maps to its packet source; all source records contain date, accessed date, role, and `used_for`. Each article has at least two specific details with a valid source ID; each data point has source date and `supports_section` locator.
- b005 S7: the source exists in `research/b005.json` with `source_role=official`, `source_type=official`, `is_official=true`, `date=2026-05-19`, `accessed=2026-08-11`, `freshness=current`, and nonempty `used_for`; the same NHS URL occurs in the b005 body and fresh HTTP probing returned 200.
- Live citations: 79 unique reader-visible URLs were probed fresh: 63 returned 2xx/3xx. The remaining 16 were 13 HTTP 403 and 3 HTTP 405 responses from access/method controls; there were no timeout, DNS, 404, or 5xx results.
- Strict manifest audits: `manifest.py audit --window 5 --strict --fail-on-warning` and the same command with `--window 20` both exited 0 with `warnings: []`, no metadata/duplicate/template/similarity/source-reuse/research risks, and progress 20 done / 0 failed / 0 review-needed.
- Cleanup: recursive temp-artifact scan returned `TEMP_ARTIFACTS=0`.

### Acceptance criteria

1. Manifest JSON and all 20 records parse; every row is done/99, category sum 99, hard gates pass — **VERIFIED**.
2. UTF-8 semantic content is uncorrupted and every reader body contains at least 3,500 Hangul — **VERIFIED**. Range: 3,535–4,318.
3. Exactly three registered internal links per article — **VERIFIED**. Draft and manifest count both equal three for all 20.
4. Article-specific details and supporting locators are present — **VERIFIED**. 20/20 packets have at least two details, valid source IDs, source dates, and section locators.
5. Reader-visible citations have source/date/role/`used_for` provenance and are live-checkable — **VERIFIED**. b005 S7 is now fully registered and live at HTTP 200; the other non-2xx/3xx responses are documented publisher access/method controls only.
6. Cross-20 title, H2, structure, CTA, and exact seven-token overlap — **VERIFIED**. Titles: 20 unique; H2 strings: 163 unique; structures: 20 unique. CTA values retain intentional controlled reuse. The normalized seven-token comparison found zero overlapping article pairs, including all four previously flagged pairs.
7. Strict audits for windows 5 and 20 — **VERIFIED**. Both fresh commands exit 0 with zero warnings.
8. No temporary artifacts — **VERIFIED**.

### Gaps found

- No blocking gaps.
- Regression watch: CDC/NICE access controls returned HTTP 403/405 to an automated probe. This is not dead-link evidence; retain normal-browser validation if a source needs manual review.

### Recommendation

**APPROVE.** The complete 20-article batch passes the requested final independent audit.
