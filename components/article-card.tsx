import Link from 'next/link';
import type { Article } from '../content/editorial';
export function ArticleCard({ article }: { article: Article }) { return <Link className="article-card" href={`/article/${article.slug}`}><span className="article-topic">{article.topic}</span><h3>{article.title}</h3><p>{article.summary}</p><time dateTime={article.publishedAt}>{article.publishedAt.replaceAll('-', '.')}</time></Link>; }
