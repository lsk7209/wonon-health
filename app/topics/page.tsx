import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';
import { topics } from '../../content/editorial';
export const metadata: Metadata = { title: '건강 주제', description: '갱년기, 수면, 뼈 건강 등 원온의 건강 주제를 살펴보세요.', alternates: { canonical: '/topics' } };
export default function TopicsPage() { return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">TOPICS</p><h1>내 몸의 변화에<br />이름을 붙이는 일</h1><p>지금 궁금한 주제부터 읽어 보세요. 원온은 증상만이 아니라 그 증상이 놓인 일상을 함께 봅니다.</p></header><section className="topic-grid" aria-label="건강 주제 목록">{topics.map((topic, index) => <Link className="topic-card" href={`/topic/${topic.slug}`} key={topic.slug}><span className="topic-index">0{index + 1}</span><span className="topic-icon" aria-hidden="true">{topic.icon}</span><h2>{topic.name}</h2><p>{topic.description}</p><span className="arrow" aria-hidden="true">↗</span></Link>)}</section></main><SiteFooter /></>; }
