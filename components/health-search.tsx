'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Article, Topic } from '../content/editorial';

export function HealthSearch({ articles, topics }: { articles: Article[]; topics: Topic[] }) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLocaleLowerCase('ko-KR');
  const results = useMemo(() => normalized ? articles.filter((article) => [article.title, article.summary, article.topic, article.searchText, ...article.body].filter(Boolean).join(' ').toLocaleLowerCase('ko-KR').includes(normalized)) : articles, [articles, normalized]);
  const suggestions = ['열감', '잠', '뼈', '검진', '기분'];

  return <div className="search-tool">
    <label htmlFor="health-search">궁금한 증상이나 주제를 입력하세요</label>
    <div className="search-row"><input id="health-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: 열감, 잠, 골밀도" autoComplete="off" /><span aria-live="polite">{results.length}개 글</span></div>
    <div className="search-chips" aria-label="추천 검색어">{suggestions.map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
    <div className="search-results" aria-live="polite">
      {results.length ? results.map((article) => <Link href={`/article/${article.slug}`} key={article.slug}><span>{article.topic}</span><strong>{article.title}</strong><p>{article.summary}</p></Link>) : <div className="empty-result"><strong>일치하는 글이 아직 없습니다.</strong><p>짧은 단어로 다시 검색하거나 아래 건강 주제에서 살펴보세요.</p></div>}
    </div>
    <div className="topic-shortcuts">{topics.map((topic) => <Link href={`/topic/${topic.slug}`} key={topic.slug}>{topic.name}</Link>)}</div>
  </div>;
}
