import assert from 'node:assert/strict';
import test from 'node:test';
import { baselinePublicSlugs, publicationSchedule } from './publication-schedule';
import { isArticlePublic, selectPublicArticles } from './publication-selector';

const firstScheduledSlug = 'after-fracture-bone-health-questions';
const firstSlot = publicationSchedule[firstScheduledSlug].publishedAt;
const batch30Slugs = [
  'family-blood-pressure-context', 'urgent-chest-pressure-action', 'menopause-lipid-trend-table',
  'stairs-breathlessness-route', 'one-sided-ankle-swelling-observation', 'fasting-glucose-sleepiness-log',
  'unintended-weight-loss-bundle', 'fatty-liver-visit-questions', 'borderline-thyroid-context-note',
  'evening-eating-pattern-timeline', 'stair-knee-response-table', 'morning-finger-stiffness-context-log',
  'shoulder-range-daily-actions', 'daytime-balance-risk-sketch', 'chair-rise-function-card',
  'workplace-hot-flash-script', 'memory-change-timeline', 'sexual-pain-visit-note',
  'mood-function-signal-light', 'itch-rash-safety-note', 'colorectal-family-history-card',
  'positive-stool-test-followup', 'screening-new-bleeding-contact', 'breast-pain-change-card',
  'pelvic-pain-symptom-calendar', 'sleepiness-safety-next-day', 'sleep-apnea-solo-observation',
  'night-waking-transfer-safety', 'alcohol-sleep-next-day-review', 'palpitations-avoidance-loop',
];
const batch60Slugs = [
  'shingles-vaccine-visit-prep', 'post-flu-cough-recovery-log', 'new-floaters-flashes-contact-card',
  'dry-eye-exposure-map', 'sudden-hearing-change-note', 'bleeding-gums-dental-note',
  'taste-change-context-table', 'medication-reconciliation-sheet', 'pain-reliever-use-context-log',
  'supplement-before-adding-card', 'hair-loss-photo-rule', 'slow-wound-healing-card',
  'swallowing-difficulty-visit-note', 'changed-constipation-calendar', 'nighttime-heartburn-review',
  'new-wheezing-observation-sheet', 'rhinitis-exposure-sleep-log', 'new-headache-pattern-card',
  'recurrent-numbness-body-diagram', 'dizziness-context-safety-table', 'covid-vaccine-appointment-note',
  'travel-diarrhea-prep-checklist', 'caregiving-own-medication-two-column', 'hand-tremor-context-card',
  'smell-change-home-safety-plan', 'fatigue-pacing-week-map', 'vaginal-discharge-triage-note',
  'blood-in-urine-contact-card', 'blood-pressure-medicine-dizziness-table', 'caregiving-appointment-questionnaire',
];
const batch110Slugs = [
  'menopause-migraine-pattern', 'hrt-personal-risk-questions', 'hrt-abnormal-bleeding-contact-note',
  'recurrent-postmenopause-uti-context', 'osteoporosis-medication-dental-prep', 'fracture-rehab-worsening-pain-log',
  'wrist-fragility-fracture-evaluation', 'head-impact-after-fall-card', 'knee-pain-swelling-signal',
  'finger-stiffness-psoriasis-eye-note', 'heel-pain-first-step-log', 'mixed-incontinence-situation-log',
  'pelvic-organ-prolapse-function-note', 'fecal-urgency-incontinence-log', 'long-term-laxative-log',
  'persistent-bloating-early-satiety-log', 'postmeal-upper-abdominal-pain-note', 'fatty-liver-medication-metabolic-sheet',
  'egfr-urine-albumin-context', 'cold-pain-medicine-bp-kidney-card', 'hba1c-prediabetes-context',
  'sweating-tremor-hypoglycemia-like-log', 'thyroid-nodule-followup-questions', 'anemia-result-context-questions',
  'b12-numbness-balance-context', 'postmenopause-cardiovascular-risk-questions', 'wearable-irregular-pulse-af-evidence',
  'home-bp-cuff-device-error-note', 'new-snoring-hypertension-log', 'smoking-cessation-weight-gain-plan',
  'vaping-cough-breathlessness-log', 'sedative-fall-risk-context-card', 'antidepressant-early-symptom-log',
  'increased-alcohol-menopause-review', 'caregiver-burnout-support-map', 'adult-vaccine-record-rebuild',
  'prolonged-fatigue-after-respiratory-infection', 'postherpetic-neuralgia-visit-note', 'changing-mole-photo-rule',
  'facial-flushing-hot-flash-difference', 'hair-loss-scalp-pain-scarring-note', 'blurred-vision-diabetes-hypertension',
  'cataract-surgery-daily-function-questions', 'hearing-test-hearing-aid-next-questions', 'recurrent-nosebleed-medication-context',
  'gum-bleeding-anticoagulant-dental-coordination', 'dry-mouth-cavity-swallowing-context', 'jaw-pain-bruxism-visit-note',
  'postmenopause-libido-change-note', 'family-cancer-genetic-counseling-prep',
];
const articles = [
  ...[...baselinePublicSlugs].map((slug) => ({ slug })),
  ...Object.keys(publicationSchedule).map((slug) => ({ slug })),
];

test('keeps the explicit 20-article baseline public before the first scheduled slot in the 139-article catalog', () => {
  const visible = selectPublicArticles(articles, new Date('2026-08-11T19:59:59+09:00'));
  assert.equal(articles.length, 139);
  assert.equal(visible.length, 20);
  assert.deepEqual(new Set(visible.map(({ slug }) => slug)), baselinePublicSlugs);
  assert.equal(isArticlePublic(firstScheduledSlug, new Date('2026-08-11T19:59:59+09:00')), false);
});

test('makes a scheduled article public at its exact KST timestamp', () => {
  const visible = selectPublicArticles(articles, new Date(firstSlot));
  assert.equal(visible.length, 21);
  assert.equal(isArticlePublic(firstScheduledSlug, new Date(firstSlot)), true);
});

test('schedules the ordered batch-30, batch-60, and batch-110 manifests at five-hour boundaries', () => {
  const slots = Object.values(publicationSchedule).map(({ publishedAt }) => Date.parse(publishedAt));
  assert.equal(baselinePublicSlugs.size, 20);
  assert.equal(slots.length, 119);
  slots.slice(1).forEach((slot, index) => assert.equal(slot - slots[index], 5 * 60 * 60 * 1000));
  assert.deepEqual(Object.keys(publicationSchedule).slice(9, 39), batch30Slugs);
  assert.equal(publicationSchedule[batch30Slugs[0]].publishedAt, '2026-08-13T17:00:00+09:00');
  assert.deepEqual(Object.keys(publicationSchedule).slice(39, 69), batch60Slugs);
  assert.equal(publicationSchedule[batch60Slugs[0]].publishedAt, '2026-08-19T23:00:00+09:00');
  assert.deepEqual(Object.keys(publicationSchedule).slice(69), batch110Slugs);
  assert.equal(publicationSchedule[batch110Slugs[0]].publishedAt, '2026-08-26T05:00:00+09:00');
  const lastSlot = publicationSchedule[batch110Slugs.at(-1)!].publishedAt;
  assert.equal(lastSlot, '2026-09-05T10:00:00+09:00');
  const visible = selectPublicArticles(articles, new Date(lastSlot));
  assert.equal(visible.length, 139);
  assert.equal(isArticlePublic(batch30Slugs[0], new Date('2026-08-13T16:59:59+09:00')), false);
  assert.equal(isArticlePublic(batch30Slugs[0], new Date('2026-08-13T17:00:00+09:00')), true);
  assert.equal(isArticlePublic(batch60Slugs[0], new Date('2026-08-19T22:59:59+09:00')), false);
  assert.equal(isArticlePublic(batch60Slugs[0], new Date('2026-08-19T23:00:00+09:00')), true);
  assert.equal(isArticlePublic(batch110Slugs[0], new Date('2026-08-26T04:59:59+09:00')), false);
  assert.equal(isArticlePublic(batch110Slugs[0], new Date('2026-08-26T05:00:00+09:00')), true);
  assert.equal(isArticlePublic('unlisted-future-draft', new Date(lastSlot)), false);
});
