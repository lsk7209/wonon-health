import type { MetadataRoute } from 'next';
import { articles, topics } from '../content/editorial';
const base = 'https://wonon.ehon365.kr';
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return [ '', '/about', '/articles', '/topics', '/editorial-policy', '/privacy', '/contact', ...topics.map(({ slug }) => `/topic/${slug}`), ...articles.map(({ slug }) => `/article/${slug}`) ].map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : .7 })); }
