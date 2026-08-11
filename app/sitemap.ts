import type { MetadataRoute } from 'next';
import { articles, topics } from '../content/editorial';

const base = 'https://wonon.ehon365.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/articles', '/topics', '/search', '/editorial-policy', '/privacy', '/terms', '/contact']
    .map((path) => ({ url: `${base}${path}`, lastModified: new Date('2026-08-11'), changeFrequency: 'monthly' as const, priority: path === '' ? 1 : .7 }));
  const topicRoutes = topics.map(({ slug }) => ({ url: `${base}/topic/${slug}`, lastModified: new Date('2026-08-11'), changeFrequency: 'monthly' as const, priority: .7 }));
  const articleRoutes = articles.map(({ slug, updatedAt }) => ({ url: `${base}/article/${slug}`, lastModified: new Date(updatedAt), changeFrequency: 'monthly' as const, priority: .7 }));
  return [...staticRoutes, ...topicRoutes, ...articleRoutes];
}
