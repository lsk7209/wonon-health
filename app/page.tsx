import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticleCard } from '../components/article-card';
import { Disclaimer } from '../components/disclaimer';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { SymptomGuide } from '../components/symptom-guide';
import { getPublicArticles, topics } from '../content/editorial';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const featured = getPublicArticles()
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 3);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '원온',
    url: 'https://wonon.ehon365.kr',
    inLanguage: 'ko-KR',
    description: '45세 이후 여성을 위한 근거 기반 건강 안내서',
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section">
          <div className="container hero-grid">
            <div>
              <p className="kicker">WONON HEALTH NOTE</p>
              <h1>변화를 겁내지 않고,<br />내 몸의 편이 되는 시간</h1>
              <p className="hero-copy">원온은 45세 이후 여성이 갱년기와 생활 건강 정보를 차분히 이해하고, 나에게 맞는 다음 행동을 고를 수 있도록 돕는 근거 기반 건강 안내서입니다.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/topic/menopause">갱년기부터 읽기</Link>
                <Link className="text-link" href="/about">원온의 기준 알아보기 <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <aside className="hero-note" aria-label="원온이 약속하는 정보 기준">
              <span className="note-number">01</span>
              <h2>증상 하나를<br />사람 전체로 봅니다.</h2>
              <p>몸의 변화, 마음의 부담, 일상의 리듬을 함께 살핍니다. 진단을 대신하지 않고, 진료실에서 더 좋은 질문을 할 수 있게 돕습니다.</p>
            </aside>
          </div>
        </section>

        <section className="section container">
          <div className="section-heading split-heading">
            <div><p className="kicker">START HERE</p><h2>지금의 나에게 가까운 주제</h2></div>
            <Link className="text-link" href="/topics">모든 주제 보기 <span aria-hidden="true">→</span></Link>
          </div>
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <Link className="topic-card" href={`/topic/${topic.slug}`} key={topic.slug}>
                <span className="topic-index">0{index + 1}</span>
                <span className="topic-icon" aria-hidden="true">{topic.icon}</span>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <div className="container feature-grid">
            <div className="feature-copy"><p className="kicker">A GENTLE CHECK-IN</p><h2>‘참아야 하나?’<br />싶은 날이라면</h2><p>갱년기 증상은 모두에게 같은 모습으로 오지 않습니다. 일상에 영향을 주는 변화가 있다면, 기록을 시작하고 의료진과 상의해 보세요.</p><Link className="button button-light" href="/article/menopause-when-to-see-a-doctor">진료 상담이 필요한 신호 보기</Link></div>
            <div className="feature-quote"><span>“</span><p>건강 정보의 목적은 불안을 키우는 것이 아니라, 나에게 필요한 도움을 더 빨리 찾게 하는 데 있습니다.</p><small>원온 편집 원칙</small></div>
          </div>
        </section>

        <section className="section container"><SymptomGuide /></section>

        <section className="section container">
          <div className="section-heading"><p className="kicker">RECENT NOTES</p><h2>천천히 읽어도 괜찮은 건강 노트</h2></div>
          <div className="article-grid">{featured.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
          <div className="center-action"><Link className="button button-outline" href="/articles">건강 노트 전체 보기</Link></div>
        </section>

        <section className="container"><Disclaimer /></section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
