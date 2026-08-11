import type { Metadata } from 'next';
import { ArticleCard } from '../../components/article-card';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { articles } from '../../content/editorial';
export const metadata: Metadata = { title: '건강 노트', description: '원온의 근거 기반 중년 여성 건강 노트입니다.', alternates: { canonical: '/articles' } };
export default function ArticlesPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">HEALTH NOTES</p><h1>건강을 이해하는<br />작고 단단한 기록</h1><p>한 번에 모든 답을 찾기보다, 신뢰할 수 있는 정보로 내 몸에 필요한 질문을 만듭니다.</p></header><section className="article-list" aria-label="건강 노트 목록">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</section></main><SiteFooter /></>; }
