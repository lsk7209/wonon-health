export type PublicationSlot = { publishedAt: string };

// These slugs remain public regardless of request time. Publication never
// depends on draft-directory order.
export const baselinePublicSlugs = new Set([
  'menopause-when-to-see-a-doctor', 'hot-flash-daily-record', 'sleep-after-45',
  'bone-health-small-steps', 'health-checkup-questions', 'national-screening-checklist-2026',
  'women-sleep-apnea-menopause-signs', 'gsm-dryness-urinary-signs', 'bone-density-result-next-questions',
  'irregular-period-change-timeline', 'postmenopausal-bleeding-visit-note',
  'menopause-palpitations-separate-log', 'menopause-medication-supplement-one-page',
  'early-waking-return-to-sleep-log', 'sleep-mood-dual-log', 'night-leg-discomfort-description',
  'two-week-sleep-log-next-questions', 'stairs-fall-risk-situation-map',
  'height-loss-context-check', 'back-pain-exercise-adjustment-questions',
]);

// Append later batches here with explicit KST timestamps. Unknown slugs remain
// private, preventing a newly integrated draft from leaking before its slot.
export const publicationSchedule: Readonly<Record<string, PublicationSlot>> = {
  'after-fracture-bone-health-questions': { publishedAt: '2026-08-11T20:00:00+09:00' },
  'urine-leakage-situation-log': { publishedAt: '2026-08-12T01:00:00+09:00' },
  'nighttime-urination-evening-flow': { publishedAt: '2026-08-12T06:00:00+09:00' },
  'recurrent-bladder-discomfort-episode-log': { publishedAt: '2026-08-12T11:00:00+09:00' },
  'blood-pressure-log-measurement-conditions': { publishedAt: '2026-08-12T16:00:00+09:00' },
  'cholesterol-result-context-history': { publishedAt: '2026-08-12T21:00:00+09:00' },
  'fasting-glucose-result-context': { publishedAt: '2026-08-13T02:00:00+09:00' },
  'breast-screening-notice-personal-context': { publishedAt: '2026-08-13T07:00:00+09:00' },
  'cervical-screening-follow-up-result-questions': { publishedAt: '2026-08-13T12:00:00+09:00' },
  'family-blood-pressure-context': { publishedAt: '2026-08-13T17:00:00+09:00' },
  'urgent-chest-pressure-action': { publishedAt: '2026-08-13T22:00:00+09:00' },
  'menopause-lipid-trend-table': { publishedAt: '2026-08-14T03:00:00+09:00' },
  'stairs-breathlessness-route': { publishedAt: '2026-08-14T08:00:00+09:00' },
  'one-sided-ankle-swelling-observation': { publishedAt: '2026-08-14T13:00:00+09:00' },
  'fasting-glucose-sleepiness-log': { publishedAt: '2026-08-14T18:00:00+09:00' },
  'unintended-weight-loss-bundle': { publishedAt: '2026-08-14T23:00:00+09:00' },
  'fatty-liver-visit-questions': { publishedAt: '2026-08-15T04:00:00+09:00' },
  'borderline-thyroid-context-note': { publishedAt: '2026-08-15T09:00:00+09:00' },
  'evening-eating-pattern-timeline': { publishedAt: '2026-08-15T14:00:00+09:00' },
  'stair-knee-response-table': { publishedAt: '2026-08-15T19:00:00+09:00' },
  'morning-finger-stiffness-context-log': { publishedAt: '2026-08-16T00:00:00+09:00' },
  'shoulder-range-daily-actions': { publishedAt: '2026-08-16T05:00:00+09:00' },
  'daytime-balance-risk-sketch': { publishedAt: '2026-08-16T10:00:00+09:00' },
  'chair-rise-function-card': { publishedAt: '2026-08-16T15:00:00+09:00' },
  'workplace-hot-flash-script': { publishedAt: '2026-08-16T20:00:00+09:00' },
  'memory-change-timeline': { publishedAt: '2026-08-17T01:00:00+09:00' },
  'sexual-pain-visit-note': { publishedAt: '2026-08-17T06:00:00+09:00' },
  'mood-function-signal-light': { publishedAt: '2026-08-17T11:00:00+09:00' },
  'itch-rash-safety-note': { publishedAt: '2026-08-17T16:00:00+09:00' },
  'colorectal-family-history-card': { publishedAt: '2026-08-17T21:00:00+09:00' },
  'positive-stool-test-followup': { publishedAt: '2026-08-18T02:00:00+09:00' },
  'screening-new-bleeding-contact': { publishedAt: '2026-08-18T07:00:00+09:00' },
  'breast-pain-change-card': { publishedAt: '2026-08-18T12:00:00+09:00' },
  'pelvic-pain-symptom-calendar': { publishedAt: '2026-08-18T17:00:00+09:00' },
  'sleepiness-safety-next-day': { publishedAt: '2026-08-18T22:00:00+09:00' },
  'sleep-apnea-solo-observation': { publishedAt: '2026-08-19T03:00:00+09:00' },
  'night-waking-transfer-safety': { publishedAt: '2026-08-19T08:00:00+09:00' },
  'alcohol-sleep-next-day-review': { publishedAt: '2026-08-19T13:00:00+09:00' },
  'palpitations-avoidance-loop': { publishedAt: '2026-08-19T18:00:00+09:00' },
};
