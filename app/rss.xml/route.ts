import { getPublicArticles } from '../../content/editorial';
import { publicationSchedule } from '../../content/publication-schedule';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://wonon.ehon365.kr';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function articleDate(slug: string, fallback: string) {
  return new Date(publicationSchedule[slug]?.publishedAt ?? fallback).toUTCString();
}

export function GET() {
  const articles = getPublicArticles()
    .toSorted((a, b) => Date.parse(publicationSchedule[b.slug]?.publishedAt ?? b.publishedAt)
      - Date.parse(publicationSchedule[a.slug]?.publishedAt ?? a.publishedAt));

  const items = articles.map((article) => {
    const url = `${baseUrl}/article/${article.slug}`;
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      <category>${escapeXml(article.topic)}</category>
      <pubDate>${articleDate(article.slug, article.publishedAt)}</pubDate>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>원온 | 중년 여성의 건강 가이드</title>
    <link>${baseUrl}</link>
    <description>45세 이후 여성을 위한 근거 기반 건강 가이드</description>
    <language>ko-KR</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
