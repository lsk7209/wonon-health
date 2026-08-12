# d001-d017 contract validation

Validated 2026-08-12 KST. This file owns only d001-d017 and is not a manifest replacement.

## Semantic checks

- 17/17 rows were rewritten around their final title lane rather than the former category overlay.
- The nearest-corpus distinction, decision moment, artifact, architecture, FAQ/CTA, and YMYL boundary are stated inside every row.
- The five-section architectures are independently authored; no architecture is reused in this 17-row slice.
- All internal comparison slugs named in `non_overlap_boundary` exist in `corpus-inventory.json`.

## Live source checks

All 51 HTTPS targets were re-requested with redirect following after repair: 51/51 returned HTTP 200, with zero final destinations at an error route. The URL set is now 51/51 unique. Seven current canonical redirects were accepted because their final page title remained topic-matched: NHS menopause symptoms, American Migraine Foundation Resources Library, MedlinePlus hormone therapy for menopause, NHS knee pain, National Eye Institute uveitis, AAOS plantar-fasciitis, and NHS bloating. The 14 failed targets were replaced by current direct sources, including MedlinePlus Migraine; NCI Menopausal Hormone Therapy and Cancer; MedlinePlus Hormone Therapy for Menopause; ACOG Perimenopausal Bleeding and Bleeding After Menopause / Abnormal Uterine Bleeding; MedlinePlus UTI; NIAMS Osteoporosis / Bone Mineral Density Tests; MedlinePlus Alendronate / Bowel Incontinence / Bisacodyl; NHS Osteoporosis Treatment / Broken Arm or Wrist; and MedlinePlus Knee Injuries.

| Row | Primary targets and verification question |
| --- | --- |
| d001 | NINDS migraine: neurologic warning signs? NHS menopause symptoms: heat/bleeding context? AMF diary: diary fields? |
| d002 | ACOG HRT: history/risk context? NICE NG23: individualized discussion? NHS HRT: form/side-effect questions? |
| d003 | ACOG bleeding after menopause: evaluation need? NHS HRT effects: bleeding contact context? MedlinePlus: urgent bleeding symptoms? |
| d004 | NIDDK UTI: symptom/test history? NHS UTI: fever/flank escalation? ACOG UTI: consultation context? |
| d005 | NIDCR osteoporosis: dental-health discussion? FDA ONJ: jaw warning? BHOF: medication-history review? |
| d006 | AAOS PT: therapy feedback? NHS broken ankle: swelling/pain progression? MedlinePlus fractures: care-contact changes? |
| d007 | BHOF fractures: fragility-fracture evaluation? NIAMS osteoporosis: risk factors? CDC falls: prevention discussion? |
| d008 | CDC TBI: emergency signs? NHS head injury: immediate help criteria? MedlinePlus: observer instructions? |
| d009 | NIAMS knee: function symptoms? NHS knee pain: urgent signs? AAOS swelling: temporal/exposure context? |
| d010 | NIAMS PsA: joint/skin pattern? NEI uveitis: painful-eye urgency? NHS psoriasis: skin consult context? |
| d011 | AAOS plantar fasciitis: first-step feature? NHS heel pain: care threshold? NIDDK diabetes: foot safety? |
| d012 | NIDDK bladder control: type distinction? ACOG incontinence: clinician questions? NHS incontinence: red flags? |
| d013 | ACOG pelvic support: symptom pattern? NHS POP: function changes? MedlinePlus pelvic floor: consultation terms? |
| d014 | NIDDK fecal incontinence: diary inputs? NHS bowel incontinence: assessment? MedlinePlus stool color: bleeding flags? |
| d015 | NIDDK constipation: evaluation context? MedlinePlus laxatives: product information? NHS constipation: alarm symptoms? |
| d016 | NHS bloating: persistent symptom threshold? NCI ovarian: symptom relevance? NIDDK dyspepsia: early-satiety context? |
| d017 | NIDDK gallstones: pain pattern? NHS gallstones: fever/jaundice escalation? MedlinePlus gallstones: clinician history? |

## YMYL boundary checks

Every row separates record preparation from diagnosis, prescribing, dose changes, and treatment selection. The escalation signal is topic-specific: neurologic deficits (d001/d008), heavy bleeding or syncope (d003), fever/flank pain (d004), jaw symptoms (d005), neurovascular limb change (d006), painful-eye vision change (d010), blood/black stool (d014), severe abdominal symptoms or jaundice (d016-d017), and the equivalent row-specific signals stated in the JSON.

## Phase-B completion

2026-08-12: the full Phase-B fields, three route-owned historical comparisons per row, and the 51-source map were reapplied to the recovered JSON. Fresh redirect-following GET validation returned 51/51 HTTP 200, 51 unique URLs, zero error destinations, and all planned evidence claims/sections remained attached to their row. Internal-route validation found zero missing targets.

## Cross-slice duplicate repair

Replaced four cross-slice collisions without changing the owned-row decision or planned section: d001 now uses the WHO *Menopause* fact sheet for transition symptoms; d003 uses the NHS *Side effects of hormone replacement therapy (HRT)* page for unscheduled bleeding context; d007 uses CDC *Falls Facts and Stats* for fall/fracture prevention context; d011 uses CDC *Your Feet and Diabetes* for diabetes-foot safety. Fresh redirect-following GET: 51/51 owned targets HTTP 200, 51 unique owned URLs, zero missing internal routes. `merge-row-contracts.cjs --out $env:TEMP\\batch110-merge-check.json` and `git diff --check` both exited 0.
