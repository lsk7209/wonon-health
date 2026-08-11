import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Disclaimer } from '../../../components/disclaimer';
import { LongformArticle } from '../../../components/longform-article';
import { SiteFooter } from '../../../components/site-footer';
import { SiteHeader } from '../../../components/site-header';
import { articleGuides, getArticle, isPublicArticle } from '../../../content/editorial';
import { getLongformArticle } from '../../../content/longform';

type Props = { params: Promise<{ slug: string }> };
export const dynamic = 'force-dynamic';


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article || !isPublicArticle(article.slug)) return { robots: { index: false, follow: false } };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article || !isPublicArticle(article.slug)) notFound();

  const guide = articleGuides[article.slug];
  const longform = article.longform ? getLongformArticle(article.slug) : undefined;
  if (article.longform && !longform) throw new Error(`Missing long-form draft for ${article.slug}`);
  const longformCitations = longform
    ? [...new Set([...longform.body.matchAll(/https?:\/\/[^\s)\]}>,]+/g)].map((match) => match[0]))]
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: 'ko-KR',
    articleSection: article.topic,
    keywords: longform?.tags,
    citation: longformCitations.length ? longformCitations : article.sources.map(({ href }) => href),
    mainEntityOfPage: `https://wonon.ehon365.kr/article/${article.slug}`,
    author: { '@type': 'Organization', name: '원온 편집팀' },
    publisher: { '@type': 'Organization', name: '원온', url: 'https://wonon.ehon365.kr' },
  };

  return <>
    <SiteHeader />
    <main id="main-content" className="article-layout">
      <article>
        <p className="article-topic">{article.topic}</p>
        <h1>{article.title}</h1>
        <p className="article-deck">{longform?.subtitle ?? article.summary}</p>
        <div className="review-status" aria-label="콘텐츠 검토 상태">
          <strong>작성·출처 확인: 원온 편집팀</strong>
          <span>의료전문가 검토 전 · 최종 출처 확인 {article.updatedAt}</span>
          <p>공식·전문기관 자료를 바탕으로 작성했으며, 개인의 진단이나 치료를 대신하지 않습니다.</p>
        </div>
        <p className="article-meta">
          <time dateTime={article.publishedAt}>발행 {article.publishedAt}</time> ·{' '}
          <time dateTime={article.updatedAt}>수정 {article.updatedAt}</time>
        </p>

        {longform ? <LongformArticle markdown={longform.body} /> : <>
          {guide && <section className="takeaway-box" aria-labelledby="takeaway-title">
            <h2 id="takeaway-title">먼저 기억할 세 가지</h2>
            <ul>{guide.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>}
          <div className="article-body">{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          {guide && <>
            <section className="action-section"><h2>오늘 해볼 수 있는 작은 행동</h2><ul className="check-list">{guide.today.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="action-section"><h2>진료실에서 물어볼 질문</h2><ol>{guide.doctorQuestions.map((item) => <li key={item}>{item}</li>)}</ol></section>
            {guide.relatedArticles && <section className="action-section" aria-labelledby="related-reading-title"><h2 id="related-reading-title">함께 읽으면 좋은 건강 노트</h2><ul>{guide.relatedArticles.map((related) => <li key={related.href}><Link href={related.href}>{related.label}</Link></li>)}</ul></section>}
          </>}
          <aside className="source-box"><h2>이 글이 확인한 자료</h2><ul>{article.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul><p>본문 자료는 새 창에서 열립니다. 진료 결정은 개인의 상태에 따라 달라질 수 있습니다.</p></aside>
        </>}
      </article>
      {!longform && <Disclaimer />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
    <SiteFooter />
  </>;
}
