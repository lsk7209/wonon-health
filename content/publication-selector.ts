import { baselinePublicSlugs, publicationSchedule } from './publication-schedule';

export type SchedulableArticle = { slug: string };

function timeValue(now: Date | number): number {
  return now instanceof Date ? now.getTime() : now;
}

export function isArticlePublic(slug: string, now: Date | number = new Date()): boolean {
  if (baselinePublicSlugs.has(slug)) return true;
  const slot = publicationSchedule[slug];
  return Boolean(slot) && timeValue(now) >= Date.parse(slot.publishedAt);
}

export function selectPublicArticles<T extends SchedulableArticle>(articles: readonly T[], now: Date | number = new Date()): T[] {
  return articles.filter((article) => isArticlePublic(article.slug, now));
}
