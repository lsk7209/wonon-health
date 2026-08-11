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
const articles = [
  ...[...baselinePublicSlugs].map((slug) => ({ slug })),
  ...Object.keys(publicationSchedule).map((slug) => ({ slug })),
];

test('keeps the explicit 20-article baseline public before the first scheduled slot', () => {
  const visible = selectPublicArticles(articles, new Date('2026-08-11T19:59:59+09:00'));
  assert.equal(articles.length, 59);
  assert.equal(visible.length, 20);
  assert.deepEqual(new Set(visible.map(({ slug }) => slug)), baselinePublicSlugs);
  assert.equal(isArticlePublic(firstScheduledSlug, new Date('2026-08-11T19:59:59+09:00')), false);
});

test('makes a scheduled article public at its exact KST timestamp', () => {
  const visible = selectPublicArticles(articles, new Date(firstSlot));
  assert.equal(visible.length, 21);
  assert.equal(isArticlePublic(firstScheduledSlug, new Date(firstSlot)), true);
});

test('schedules the ordered batch-30 manifest after the existing nine slots at five-hour boundaries', () => {
  const slots = Object.values(publicationSchedule).map(({ publishedAt }) => Date.parse(publishedAt));
  assert.equal(baselinePublicSlugs.size, 20);
  assert.equal(slots.length, 39);
  slots.slice(1).forEach((slot, index) => assert.equal(slot - slots[index], 5 * 60 * 60 * 1000));
  assert.deepEqual(Object.keys(publicationSchedule).slice(9), batch30Slugs);
  assert.equal(publicationSchedule[batch30Slugs[0]].publishedAt, '2026-08-13T17:00:00+09:00');
  const lastSlot = publicationSchedule[batch30Slugs.at(-1)!].publishedAt;
  assert.equal(lastSlot, '2026-08-19T18:00:00+09:00');
  const visible = selectPublicArticles(articles, new Date(lastSlot));
  assert.equal(visible.length, 59);
  assert.equal(isArticlePublic(batch30Slugs[0], new Date('2026-08-13T16:59:59+09:00')), false);
  assert.equal(isArticlePublic(batch30Slugs[0], new Date('2026-08-13T17:00:00+09:00')), true);
  assert.equal(isArticlePublic('unlisted-future-draft', new Date(lastSlot)), false);
});
