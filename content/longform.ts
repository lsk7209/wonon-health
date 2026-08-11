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

const draftsDirectory = join(process.cwd(), 'output', 'wonon', 'drafts');

function readScalar(value: string): string | boolean {
  const trimmed = value.trim().replace(/^['"]|['"]$/g, '');
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed;
}

function parseDraft(fileName: string): LongformArticle {
  const raw = readFileSync(join(draftsDirectory, fileName), 'utf8').replace(/^\uFEFF/, '');
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
    fields[field[1]] = field[2] === '' ? [] : readScalar(field[2]);
  }

  const required = (key: keyof LongformArticle) => {
    const value = fields[key];
    if (typeof value !== 'string' || !value) throw new Error(`Missing ${key} in ${fileName}`);
    return value;
  };

  return {
    title: required('title'), subtitle: required('subtitle'), slug: required('slug'),
    description: required('description'), author: required('author'), date: required('date'),
    tags: Array.isArray(fields.tags) ? fields.tags : [], cluster: required('cluster'),
    isPillar: fields.isPillar === true, target: required('target'), draft: fields.draft === true,
    body: match[2].trim(),
  };
}

export function getLongformArticles(): LongformArticle[] {
  return readdirSync(draftsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .sort()
    .map(parseDraft);
}

export function getLongformArticle(slug: string): LongformArticle | undefined {
  return getLongformArticles().find((article) => article.slug === slug);
}
