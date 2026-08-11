import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export type LongformArticle = {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  cluster: string;
  isPillar: boolean;
  target: string;
  draft: boolean;
  body: string;
};

const draftsDirectories = [
  join(process.cwd(), 'output', 'wonon', 'drafts'),
  join(process.cwd(), 'output', 'wonon', 'batch-20', 'drafts'),
];

function readScalar(value: string): string | boolean {
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed;
}

function parseDraft(directory: string, fileName: string): LongformArticle {
  const raw = readFileSync(join(directory, fileName), 'utf8').replace(/^\uFEFF/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${fileName}`);

  const fields: Record<string, string | boolean | string[]> = { tags: [] };
  let activeList: string | undefined;
  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && activeList) {
      const list = fields[activeList];
      if (Array.isArray(list)) list.push(String(readScalar(listItem[1])));
      continue;
    }

    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!field) continue;
    activeList = field[2] === '' ? field[1] : undefined;
    const inlineList = field[2].match(/^\[(.*)\]$/);
    fields[field[1]] = field[2] === ''
      ? []
      : inlineList
        ? inlineList[1].split(',').map((item) => String(readScalar(item)))
        : readScalar(field[2]);
  }

  const required = (key: keyof LongformArticle) => {
    const value = fields[key];
    if (typeof value !== 'string' || !value) throw new Error(`Missing ${key} in ${fileName}`);
    return value;
  };

  const description = required('description');
  const subtitle = typeof fields.subtitle === 'string' && fields.subtitle
    ? fields.subtitle
    : description;

  return {
    title: required('title'), subtitle, slug: required('slug'),
    description, author: required('author'), date: required('date'),
    tags: Array.isArray(fields.tags) ? fields.tags : [], cluster: required('cluster'),
    isPillar: fields.isPillar === true, target: required('target'), draft: fields.draft === true,
    body: match[2].trim(),
  };
}

export function getLongformArticles(): LongformArticle[] {
  const articles = draftsDirectories.flatMap((directory) => readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .sort()
    .map((fileName) => parseDraft(directory, fileName)));
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug)) throw new Error(`Duplicate long-form slug: ${article.slug}`);
    slugs.add(article.slug);
  }
  return articles;
}

export function getLongformArticle(slug: string): LongformArticle | undefined {
  return getLongformArticles().find((article) => article.slug === slug);
}
