import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '../../../components/article-card';
import { Disclaimer } from '../../../components/disclaimer';
import { SiteFooter } from '../../../components/site-footer';
import { SiteHeader } from '../../../components/site-header';
import { articles, getTopic, topics } from '../../../content/editorial';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return topics.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const topic = getTopic((await params).slug); return { title: topic?.name ?? '주제', description: topic?.description }; }
export default async function TopicPage({ params }: Props) { const topic = getTopic((await params).slug); if (!topic) notFound(); const filtered = articles.filter((article) => article.topicSlug === topic.slug); return <><SiteHeader /><main id="main-content" className="container page-shell"><header className="page-heading"><p className="kicker">TOPIC / {topic.name.toUpperCase()}</p><h1>{topic.name}</h1><p>{topic.description} 모든 정보는 개인의 상태에 따라 다르게 적용될 수 있습니다.</p></header><p className="topic-intro">원온의 글은 의학적 진단이나 처방이 아닌, 더 나은 질문과 다음 행동을 위한 출발점입니다.</p><section className="article-list" aria-label={`${topic.name} 글 목록`}>{filtered.map((article) => <ArticleCard article={article} key={article.slug} />)}</section><Disclaimer /></main><SiteFooter /></>; }
