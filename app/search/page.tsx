import type { Metadata } from 'next';
import { HealthSearch } from '../../components/health-search';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { articles, topics } from '../../content/editorial';

export const metadata: Metadata = { title: '건강 정보 검색', description: '증상과 주제로 원온의 중년 여성 건강 정보를 찾아보세요.', alternates: { canonical: '/search' } };

export default function SearchPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">SEARCH WONON</p><h1>내가 궁금한 말로<br />건강 정보를 찾아보세요</h1><p>검색 결과는 진단이나 개인 의료 조언이 아닙니다. 읽은 뒤 필요한 질문을 정리하는 데 활용하세요.</p></header><HealthSearch articles={articles} topics={topics} /></main><SiteFooter /></>; }
