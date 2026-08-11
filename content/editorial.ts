export type Topic = { slug: string; name: string; description: string; icon: string };
import { getLongformArticles } from './longform';
import { isArticlePublic, selectPublicArticles } from './publication-selector';

export type Article = { slug: string; topic: string; topicSlug: string; title: string; summary: string; publishedAt: string; updatedAt: string; body: string[]; sources: { label: string; href: string }[]; tags?: string[]; longform?: boolean; searchText?: string };
export type ArticleGuide = { takeaways: string[]; today: string[]; doctorQuestions: string[] };

export const topics: Topic[] = [
  { slug: 'menopause', name: '갱년기 이해하기', description: '몸의 변화와 치료 선택지를 차분히 살펴봅니다.', icon: '◐' },
  { slug: 'sleep-mood', name: '잠과 마음', description: '수면, 기분, 스트레스의 연결을 이해합니다.', icon: '☾' },
  { slug: 'bone-muscle', name: '뼈와 근육', description: '오래 움직이기 위한 생활 습관을 찾습니다.', icon: '⌁' },
  { slug: 'everyday-care', name: '일상 건강', description: '검진과 식사, 활동을 생활에 맞게 정리합니다.', icon: '✳' },
];

const longformTopicSlugs: Record<string, string> = {
  'menopause-transition': 'menopause',
  menopause: 'menopause',
  'sleep-mood': 'sleep-mood',
  'bone-muscle': 'bone-muscle',
  'bone-muscle-falls': 'bone-muscle',
  'pelvic-urinary': 'everyday-care',
  cardiometabolic: 'everyday-care',
  'preventive-screening': 'everyday-care',
};

const batch30TopicSlugs: Record<string, string> = {
  'family-blood-pressure-context': 'everyday-care',
  'urgent-chest-pressure-action': 'everyday-care',
  'menopause-lipid-trend-table': 'menopause',
  'stairs-breathlessness-route': 'everyday-care',
  'one-sided-ankle-swelling-observation': 'everyday-care',
  'fasting-glucose-sleepiness-log': 'everyday-care',
  'unintended-weight-loss-bundle': 'everyday-care',
  'fatty-liver-visit-questions': 'everyday-care',
  'borderline-thyroid-context-note': 'everyday-care',
  'evening-eating-pattern-timeline': 'everyday-care',
  'stair-knee-response-table': 'bone-muscle',
  'morning-finger-stiffness-context-log': 'bone-muscle',
  'shoulder-range-daily-actions': 'bone-muscle',
  'daytime-balance-risk-sketch': 'bone-muscle',
  'chair-rise-function-card': 'bone-muscle',
  'workplace-hot-flash-script': 'menopause',
  'memory-change-timeline': 'menopause',
  'sexual-pain-visit-note': 'menopause',
  'mood-function-signal-light': 'sleep-mood',
  'itch-rash-safety-note': 'everyday-care',
  'colorectal-family-history-card': 'everyday-care',
  'positive-stool-test-followup': 'everyday-care',
  'screening-new-bleeding-contact': 'everyday-care',
  'breast-pain-change-card': 'everyday-care',
  'pelvic-pain-symptom-calendar': 'everyday-care',
  'sleepiness-safety-next-day': 'sleep-mood',
  'sleep-apnea-solo-observation': 'sleep-mood',
  'night-waking-transfer-safety': 'sleep-mood',
  'alcohol-sleep-next-day-review': 'sleep-mood',
  'palpitations-avoidance-loop': 'sleep-mood',
};

const batch60TopicSlugs: Record<string, string> = {
  'shingles-vaccine-visit-prep': 'everyday-care',
  'post-flu-cough-recovery-log': 'everyday-care',
  'new-floaters-flashes-contact-card': 'everyday-care',
  'dry-eye-exposure-map': 'everyday-care',
  'sudden-hearing-change-note': 'everyday-care',
  'bleeding-gums-dental-note': 'everyday-care',
  'taste-change-context-table': 'everyday-care',
  'medication-reconciliation-sheet': 'everyday-care',
  'pain-reliever-use-context-log': 'everyday-care',
  'supplement-before-adding-card': 'menopause',
  'hair-loss-photo-rule': 'everyday-care',
  'slow-wound-healing-card': 'everyday-care',
  'swallowing-difficulty-visit-note': 'everyday-care',
  'changed-constipation-calendar': 'everyday-care',
  'nighttime-heartburn-review': 'everyday-care',
  'new-wheezing-observation-sheet': 'everyday-care',
  'rhinitis-exposure-sleep-log': 'sleep-mood',
  'new-headache-pattern-card': 'everyday-care',
  'recurrent-numbness-body-diagram': 'everyday-care',
  'dizziness-context-safety-table': 'everyday-care',
  'covid-vaccine-appointment-note': 'everyday-care',
  'travel-diarrhea-prep-checklist': 'everyday-care',
  'caregiving-own-medication-two-column': 'everyday-care',
  'hand-tremor-context-card': 'everyday-care',
  'smell-change-home-safety-plan': 'everyday-care',
  'fatigue-pacing-week-map': 'sleep-mood',
  'vaginal-discharge-triage-note': 'menopause',
  'blood-in-urine-contact-card': 'everyday-care',
  'blood-pressure-medicine-dizziness-table': 'everyday-care',
  'caregiving-appointment-questionnaire': 'everyday-care',
};

const topicNames = new Map(topics.map((topic) => [topic.slug, topic.name]));

const catalogLongformSlugs = new Set([
  'irregular-period-change-timeline',
  'postmenopausal-bleeding-visit-note',
  'menopause-palpitations-separate-log',
  'menopause-medication-supplement-one-page',
  'early-waking-return-to-sleep-log',
  'sleep-mood-dual-log',
  'night-leg-discomfort-description',
  'two-week-sleep-log-next-questions',
  'stairs-fall-risk-situation-map',
  'height-loss-context-check',
  'back-pain-exercise-adjustment-questions',
  'after-fracture-bone-health-questions',
  'urine-leakage-situation-log',
  'nighttime-urination-evening-flow',
  'recurrent-bladder-discomfort-episode-log',
  'blood-pressure-log-measurement-conditions',
  'cholesterol-result-context-history',
  'fasting-glucose-result-context',
  'breast-screening-notice-personal-context',
  'cervical-screening-follow-up-result-questions',
  ...Object.keys(batch30TopicSlugs),
  ...Object.keys(batch60TopicSlugs),
]);

const batchLongformArticles: Article[] = getLongformArticles()
  .filter((article) => catalogLongformSlugs.has(article.slug))
  .map((article) => {
    const topicSlug = longformTopicSlugs[article.cluster]
      ?? batch30TopicSlugs[article.slug]
      ?? batch60TopicSlugs[article.slug]
      ?? 'everyday-care';
    const topic = topicNames.get(topicSlug);
    if (!topic) throw new Error(`Unknown topic for long-form cluster: ${article.cluster}`);
    return {
      slug: article.slug,
      topic,
      topicSlug,
      title: article.title,
      summary: article.description,
      publishedAt: article.date,
      updatedAt: article.date,
      body: [],
      sources: [],
      tags: article.tags,
      longform: true,
      searchText: [article.title, article.subtitle, article.description, ...article.tags].join(' '),
    };
  });

export const articles: Article[] = [
  { slug: 'menopause-when-to-see-a-doctor', topic: '갱년기 이해하기', topicSlug: 'menopause', title: '갱년기 증상, 언제 진료 상담을 시작하면 좋을까요?', summary: '참는 것이 답인지 헷갈릴 때 살펴볼 신호와 진료 준비 방법입니다.', publishedAt: '2026-08-11', updatedAt: '2026-08-11', body: ['갱년기는 마지막 월경 전후의 전환기를 말하며, 안면홍조·야간 발한·수면 변화·기분 변화처럼 사람마다 다른 증상이 나타날 수 있습니다. 증상이 있다는 사실만으로 위험하다는 뜻은 아니지만, 생활에 영향을 준다면 상담할 이유가 충분합니다.', '특히 월경이 끝난 뒤 다시 출혈이 있거나, 출혈 양상이 갑자기 달라졌다면 갱년기라고 단정하지 말고 진료를 받아야 합니다. 심한 두근거림, 흉통, 호흡 곤란, 갑작스러운 신경학적 증상도 즉시 평가가 필요한 신호입니다.', '진료 전에는 증상이 언제 시작됐는지, 잠·기분·일상에 어떤 영향을 주는지, 복용 중인 약과 가족력을 간단히 적어 보세요. 기록은 정답을 찾기 위한 시험지가 아니라 의료진과 대화를 시작하는 지도입니다.'], sources: [{ label: 'NHS: Menopause', href: 'https://www.nhs.uk/conditions/menopause/' }, { label: 'NAMS: MenoNote (symptoms)', href: 'https://menopause.org/patient-education/menonotes' }] },
  { slug: 'hot-flash-daily-record', topic: '갱년기 이해하기', topicSlug: 'menopause', title: '열감과 땀, 내 패턴을 알아차리는 7일 기록', summary: '증상을 없애기 전, 먼저 내 생활과의 관계를 알아보는 방법입니다.', publishedAt: '2026-08-08', updatedAt: '2026-08-11', body: ['열감과 야간 발한은 갱년기에 흔히 이야기되는 혈관운동 증상입니다. 강도와 빈도는 매우 다양하며, 잠이나 업무, 외출에 미치는 영향도 서로 다릅니다.', '7일 동안 날짜, 시간, 느낀 강도, 그 직전의 활동과 음식·음료, 수면 상태를 짧게 기록해 보세요. 특정 음식이나 스트레스가 모두에게 원인이 되는 것은 아니지만, 내 패턴을 발견하는 데 도움이 될 수 있습니다.', '기록을 보며 생활 조절만으로 충분한지, 상담이 필요한지 판단할 실마리를 얻을 수 있습니다. 증상이 괴롭거나 갑자기 심해졌다면 기록을 들고 의료진과 상의하세요.'], sources: [{ label: 'NHS: Hot flushes and night sweats', href: 'https://www.nhs.uk/conditions/menopause/symptoms/' }, { label: 'NHS: Menopause treatment', href: 'https://www.nhs.uk/conditions/menopause/treatment/' }] },
  { slug: 'sleep-after-45', topic: '잠과 마음', topicSlug: 'sleep-mood', title: '자꾸 깨는 밤, 수면의 질부터 살펴보세요', summary: '갱년기 전후 잠이 달라졌을 때 확인할 생활 신호를 정리합니다.', publishedAt: '2026-08-05', updatedAt: '2026-08-05', body: ['수면은 나이가 들수록 한 번에 이어지는 방식이 달라질 수 있고, 갱년기 전후의 야간 발한이나 기분 변화가 잠을 방해하기도 합니다. 피곤하다고 해서 반드시 갱년기 때문이라고 볼 수는 없습니다.', '취침·기상 시간을 가능한 한 일정하게 하고, 낮 시간의 가벼운 활동과 아침 빛 노출을 생활에 넣어 보세요. 잠들기 직전의 음주나 과도한 카페인은 수면을 더 잘게 만들 수 있습니다.', '코골이와 숨 멎음, 다리 불편감, 지속되는 우울감 또는 낮의 심한 졸림이 있다면 다른 수면 문제도 함께 평가받는 것이 좋습니다.'], sources: [{ label: 'NHLBI: Healthy Sleep Habits', href: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits' }, { label: 'NHS: Menopause symptoms', href: 'https://www.nhs.uk/conditions/menopause/symptoms/' }] },
  { slug: 'bone-health-small-steps', topic: '뼈와 근육', topicSlug: 'bone-muscle', title: '뼈 건강은 ‘한 번에 많이’보다 ‘꾸준히 움직이기’에서 시작됩니다', summary: '골밀도 검사를 포함해 오래 움직이기 위한 기본 질문을 정리합니다.', publishedAt: '2026-08-02', updatedAt: '2026-08-11', body: ['폐경 후에는 에스트로겐 변화와 함께 골 손실 속도가 달라질 수 있습니다. 하지만 뼈 건강은 한 가지 음식이나 운동만으로 결정되지 않으며, 나이·체중·골절 경험·약물·가족력 등 여러 요소를 함께 봅니다.', '걷기처럼 체중을 싣는 활동과 근육을 쓰는 운동은 일상 기능을 지키는 데 도움이 됩니다. 시작 전 관절 통증, 낙상 경험, 기존 질환이 있다면 자신의 상태에 맞는 운동을 상담하세요.', '골절을 겪었거나 키가 줄고 등이 굽는 변화가 느껴진다면 검사를 포함해 의료진에게 골 건강 평가가 필요한지 물어보세요.'], sources: [{ label: 'ACOG: Osteoporosis', href: 'https://www.acog.org/womens-health/faqs/osteoporosis' }, { label: 'WHO: Physical activity', href: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' }] },
  { slug: 'health-checkup-questions', topic: '일상 건강', topicSlug: 'everyday-care', title: '건강검진 결과를 받았을 때, 먼저 물어볼 세 가지', summary: '수치 하나에 흔들리지 않고 다음 행동을 정하는 질문들입니다.', publishedAt: '2026-07-30', updatedAt: '2026-07-30', body: ['검진 결과의 숫자는 현재 상태를 살펴보는 하나의 단서입니다. 결과지를 받았을 때는 기준 범위를 벗어났는지뿐 아니라, 내 나이와 병력에서 그 수치가 무엇을 의미하는지 확인하는 과정이 중요합니다.', '“재검이 필요한가요?”, “생활에서 바꿀 수 있는 한 가지는 무엇인가요?”, “다음 확인 시점은 언제인가요?”처럼 구체적인 질문을 적어 두세요. 수치 해석과 치료 결정은 개인의 상태에 따라 달라집니다.', '검진은 불안을 위한 성적표가 아니라 예방과 상담을 위한 출발점입니다. 증상이 있거나 걱정되는 가족력이 있다면 검진 시기와 별개로 진료를 받으세요.'], sources: [{ label: 'WHO: Health promotion', href: 'https://www.who.int/health-topics/health-promotion' }, { label: '질병관리청 국가건강정보포털', href: 'https://health.kdca.go.kr/' }] },
  { slug: 'national-screening-checklist-2026', topic: '일상 건강', topicSlug: 'everyday-care', title: '2026년 국가건강검진, 대상 여부부터 확인하는 방법', summary: '검진표를 받았을 때 내게 해당하는 항목과 결과 확인의 다음 단계를 정리합니다.', publishedAt: '2026-08-11', updatedAt: '2026-08-11', body: ['국가건강검진은 질병을 조기에 발견하고 예방하기 위한 검사입니다. 대상 여부와 검진 항목은 연령, 성별, 가입 유형 등에 따라 달라질 수 있으므로, 안내문만 보고 추측하기보다 국민건강보험공단의 조회 서비스에서 올해 대상인지 확인하는 것이 가장 정확합니다.', '질병관리청 국가건강정보포털은 일반건강검진이 보통 2년 주기로 운영되며, 성별·연령별 항목이 다를 수 있다고 안내합니다. 예를 들어 여성의 골밀도 검사는 정해진 연령에 실시될 수 있고, 개인의 병력이나 증상이 있다면 국가검진 일정과 별개로 진료 상담이 필요할 수 있습니다.', '검진 전에는 예약 기관의 준비 안내를 확인하고, 검진 뒤에는 결과지의 재검·상담 권고를 놓치지 마세요. 검진은 모든 질병을 찾아내거나 안전을 보장하는 검사가 아니므로, 새롭거나 지속되는 증상은 결과와 무관하게 의료진과 상의해야 합니다.'], sources: [{ label: '질병관리청 국가건강정보포털: 건강검진(국가건강검진)', href: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6671' }, { label: '질병관리청: 국가건강검진 기준 및 질 관리', href: 'https://www.kdca.go.kr/kdca/3360/subview.do' }, { label: '국민건강보험공단', href: 'https://www.nhis.or.kr/' }] },
  { slug: 'women-sleep-apnea-menopause-signs', topic: '잠과 마음', topicSlug: 'sleep-mood', title: '갱년기 불면으로 넘기기 전, 여성 수면무호흡 의심 신호', summary: '큰 코골이가 없어도 놓치기 쉬운 여성 수면무호흡 신호를 본인 증상과 동침자 관찰로 나눠 기록하는 방법입니다.', publishedAt: '2026-08-11', updatedAt: '2026-08-11', body: ['여성에게 수면무호흡은 불면, 피로, 아침 두통, 잦은 각성처럼 나타날 수 있습니다. 본인이 느낀 낮 증상과 동침자가 본 밤의 호흡 신호를 나눠 기록해 상담 질문을 준비합니다.'], sources: [{ label: 'NHLBI: Sleep Apnea and Women', href: 'https://www.nhlbi.nih.gov/health/sleep-apnea/women' }, { label: '질병관리청 국가건강정보포털: 코골이', href: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5362' }], longform: true, searchText: '수면검사 수면다원검사 폐경 코골이 무호흡 저호흡 낮 졸림 아침 두통 동침자 관찰' },
  { slug: 'gsm-dryness-urinary-signs', topic: '갱년기 이해하기', topicSlug: 'menopause', title: '질 건조와 빈뇨가 함께 왔을 때: 증상 위치로 정리하는 폐경 후 진료 메모', summary: '질·외음부·배뇨 증상을 나눠 기록하고 출혈·혈뇨·비정상 분비물처럼 별도 평가가 필요한 신호를 구분합니다.', publishedAt: '2026-08-11', updatedAt: '2026-08-11', body: ['폐경 전후 질 건조와 외음부 자극, 배뇨 불편은 함께 나타날 수 있지만 증상만으로 원인을 단정할 수 없습니다. 위치와 동반 신호를 기록해 생활관리와 진료 질문을 구분합니다.'], sources: [{ label: 'The Menopause Society: GSM MenoNote', href: 'https://menopause.org/wp-content/uploads/for-women/MenoNote-GSM.pdf' }, { label: 'NHS: Vaginal dryness', href: 'https://www.nhs.uk/symptoms/vaginal-dryness/' }], longform: true, searchText: '비뇨생식기증후군 GSM 윤활제 보습제 유방암 자궁암 질출혈 성관계후출혈 혈뇨 요로감염 배뇨통 절박뇨' },
  { slug: 'bone-density-result-next-questions', topic: '뼈와 근육', topicSlug: 'bone-muscle', title: '골밀도 검사 결과표, T점수만 보지 말아야 하는 이유', summary: '폐경 후 골밀도 결과를 측정부위·골절력·키 변화·복용 약과 함께 읽고 재검 질문을 준비하는 순서입니다.', publishedAt: '2026-08-11', updatedAt: '2026-08-11', body: ['T점수는 골밀도 결과를 이해하는 출발점이지만 다음 행동을 혼자 결정하는 숫자는 아닙니다. 측정부위와 골절·키 변화·약물·가족력·재검 목적을 함께 확인합니다.'], sources: [{ label: 'NIAMS: Bone Mineral Density Tests', href: 'https://www.niams.nih.gov/health-topics/bone-mineral-density-tests-what-numbers-mean' }, { label: 'ISCD: Official Adult Positions 2023', href: 'https://iscd.org/official-positions-2023/' }], longform: true, searchText: 'DXA DEXA T점수 대퇴골경부 총고관절 척추골절 압박골절 키감소 글루코코르티코이드 재검 VFA' },
  ...batchLongformArticles,
];

export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
export function getTopic(slug: string) { return topics.find((topic) => topic.slug === slug); }
export function getPublicArticles(now: Date | number = new Date()) { return selectPublicArticles(articles, now); }
export function isPublicArticle(slug: string, now: Date | number = new Date()) { return isArticlePublic(slug, now); }

export const articleGuides: Record<string, ArticleGuide> = {
  'menopause-when-to-see-a-doctor': {
    takeaways: ['증상이 일상과 수면을 방해한다면 상담할 충분한 이유가 됩니다.', '폐경 후 출혈이나 갑작스러운 심한 증상은 갱년기로 단정하지 않습니다.', '증상과 복용 약을 간단히 기록하면 진료 대화가 더 구체적이 됩니다.'],
    today: ['증상이 시작된 시점과 빈도를 메모합니다.', '수면·업무·기분에 미친 영향을 한 문장으로 적습니다.', '복용 중인 약과 건강기능식품 목록을 준비합니다.'],
    doctorQuestions: ['이 증상에서 먼저 확인해야 할 다른 원인이 있나요?', '생활 조절과 치료 선택지는 각각 어떤 장단점이 있나요?', '어떤 변화가 생기면 더 빨리 다시 진료받아야 하나요?'],
  },
  'hot-flash-daily-record': {
    takeaways: ['열감의 빈도와 영향은 사람마다 다릅니다.', '7일 기록은 원인을 단정하기보다 내 패턴을 찾는 도구입니다.', '괴롭거나 갑자기 심해진 증상은 기록과 함께 상담합니다.'],
    today: ['시간·강도·지속 시간을 짧게 적습니다.', '직전 활동과 음식·음료, 스트레스 상황을 함께 표시합니다.', '밤에 깼다면 다음 날 피로 정도도 기록합니다.'],
    doctorQuestions: ['제 기록에서 추가로 확인할 점이 있나요?', '현재 복용 약이 증상에 영향을 줄 수 있나요?', '저에게 맞는 비호르몬·호르몬 치료 선택지는 무엇인가요?'],
  },
  'sleep-after-45': {
    takeaways: ['수면 변화가 모두 갱년기 때문인 것은 아닙니다.', '일정한 기상 시간과 낮 활동은 수면 리듬을 점검하는 출발점입니다.', '코골이·숨 멎음·심한 낮 졸림은 별도 평가가 필요할 수 있습니다.'],
    today: ['일주일간 취침·기상·각성 시간을 적습니다.', '오후 카페인과 취침 전 음주 시간을 확인합니다.', '코골이나 숨 멎음을 들은 적이 있는지 가족에게 묻습니다.'],
    doctorQuestions: ['갱년기 외에 확인할 수면 문제가 있나요?', '현재 약이나 음주 습관이 잠에 영향을 주나요?', '수면 검사가 필요한 신호가 있나요?'],
  },
  'bone-health-small-steps': {
    takeaways: ['폐경 후 뼈 건강은 여러 위험 요인을 함께 살펴야 합니다.', '체중 부하 활동과 근력 운동은 일상 기능을 지키는 기본입니다.', '골절 경험이나 키 감소가 있다면 평가 시기를 상담합니다.'],
    today: ['최근 골절·낙상·키 변화를 떠올려 적습니다.', '무리 없이 반복할 수 있는 걷기나 근력 활동을 정합니다.', '골다공증 가족력과 장기 복용 약을 확인합니다.'],
    doctorQuestions: ['제 위험 요인에서 골밀도 검사가 필요한가요?', '관절이나 기존 질환을 고려한 운동 강도는 어느 정도인가요?', '칼슘과 비타민 D는 식사와 보충제 중 어떻게 확인하나요?'],
  },
  'health-checkup-questions': {
    takeaways: ['검진 수치는 개인의 병력과 변화 추세를 함께 해석합니다.', '재검 여부·생활 변화·다음 확인 시점을 구체적으로 묻습니다.', '새롭거나 지속되는 증상은 검진 결과와 별개로 상담합니다.'],
    today: ['이전 결과지가 있다면 나란히 놓고 변화를 봅니다.', '재검·추적 관찰 표시가 있는 항목에 동그라미를 칩니다.', '진료실에서 물을 세 가지 질문을 메모합니다.'],
    doctorQuestions: ['이 수치가 제 병력에서 어떤 의미인가요?', '가장 먼저 바꿀 생활 습관 한 가지는 무엇인가요?', '언제, 어떤 검사로 다시 확인해야 하나요?'],
  },
  'national-screening-checklist-2026': {
    takeaways: ['국가검진 대상과 항목은 공단 조회로 확인하는 것이 정확합니다.', '개인 병력이나 증상에 필요한 진료는 국가검진 일정과 다를 수 있습니다.', '검진 뒤 재검·상담 권고까지 확인해야 다음 행동이 완성됩니다.'],
    today: ['국민건강보험공단에서 올해 대상 여부를 조회합니다.', '검진 기관의 금식·복용 약 안내를 확인합니다.', '결과를 받을 방법과 예상 시점을 메모합니다.'],
    doctorQuestions: ['제 연령과 병력에 추가로 필요한 검사가 있나요?', '복용 중인 약은 검진 당일 어떻게 해야 하나요?', '결과 중 어느 항목을 언제 다시 확인해야 하나요?'],
  },
};
