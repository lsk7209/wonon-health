# Batch-110 independent final contract re-audit

**Verdict: PASS — authorized for a five-article dry run only.**

Fresh audit time: 2026-08-12 (Asia/Seoul). Scope: regenerated `row-contracts.merged.json`, repaired source blocks, current 89-article catalog, merger/validator, and all 150 evidence URLs. No drafting, scheduling, or promotion was performed by this audit.

## Fresh evidence

```text
node output/wonon/batch-110/validate-row-contracts.cjs --input output/wonon/batch-110/row-contracts.merged.json
PASS: 50 schema-complete, semantically differentiated contracts; 150 unique evidence URLs; 50 architectures; 34 link plans.

Independent merger regeneration: byteIdentical=true
Recursive content scan: 50 rows; 50 unique ids; 150 URLs; 150 unique; corruption=[]
All-150 redirect-following GET scan: 150/150 usable 2xx; 0 failures
Catalog audit: 89 catalog slugs; 145/145 planned links resolve; 129/129 historical references resolve
```

The URL audit followed redirects using GET (20-second deadline, ten concurrent requests) and inspected final URLs/page titles. The eight redirects land on topic-appropriate current pages: NHS knee pain, heel pain, bloating, hair loss, dry mouth, and menopause; AAD melanoma ABCDEs; and NEI refractive errors.

## Acceptance criteria

| Criterion | Status | Evidence |
| --- | --- | --- |
| 50 distinct contracts / 150 distinct evidence URLs | VERIFIED | 50 unique ids; exactly 150 unique targets. |
| Merger truthfulness | VERIFIED | Fresh merge output is byte-identical to checked output. |
| Korean content with no corruption/placeholders | VERIFIED | Recursive scan found no `??`, U+FFFD, TODO/TBD, placeholder, or lorem-ipsum marker. |
| Every evidence target live and topic-appropriate after redirects | VERIFIED | 150/150 final destinations returned usable 2xx; no generic or mismatched final destination remains. |
| Internal links against current 89-article corpus | VERIFIED (contract level) | All 145 planned link targets resolve to the reconciled 89-slug catalog. |
| Historical distinctions | VERIFIED (contract level) | All 129 references resolve; changed decision, artifact, and architecture fields are present. |
| Semantic anti-template after entity stripping | VERIFIED (contract level) | No duplicate normalized composite contract among 50; 50 architectures validated. |
| Row-specific YMYL boundaries | VERIFIED | Each row contains at least three distinct boundaries. |
| Validator truthfulness | VERIFIED for this release gate with independent supplement | Structural validator passes; the independent full live scan supplies the network evidence it does not itself perform. |

## Authorization and boundary

The **five-article dry run is authorized**. This approval covers only the first five draft-generation candidates under the existing batch-110 workflow. It is not authorization to generate the remaining 45, schedule articles, publish content, or alter the site. Re-audit the resulting five drafts for rendered internal links, source citations, YMYL language, and contract adherence before expanding the batch.

## Limitations

This is a source-contract audit. It proves planned link targets map to the 89-item catalog; browser verification of actual emitted routes belongs to the five-draft QA gate.
