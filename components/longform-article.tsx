import type { ReactNode } from 'react';
import { isMarkdownTableSeparator, markdownTableCells } from './longform-table';

type LongformArticleProps = {
  markdown: string;
  topicHref: string;
  topicName: string;
};

type InlinePart = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };

function safeHref(href: string): string | undefined {
  const value = href.trim();
  return /^(?:https?:\/\/|\/|#)/.test(value) ? value : undefined;
}

function inlineParts(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index! > cursor) parts.push({ type: 'text', value: text.slice(cursor, match.index) });
    parts.push({ type: 'link', label: match[1], href: match[2] });
    cursor = match.index! + match[0].length;
  }
  if (cursor < text.length) parts.push({ type: 'text', value: text.slice(cursor) });
  return parts;
}

function boldText(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>
      : part,
  );
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return inlineParts(text).flatMap((part, index) => {
    if (part.type === 'text') return boldText(part.value, `${keyPrefix}-${index}`);
    const href = safeHref(part.href);
    if (!href) return boldText(`[${part.label}](${part.href})`, `${keyPrefix}-${index}`);
    const external = href.startsWith('http');
    return <a key={`${keyPrefix}-${index}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{boldText(part.label, `${keyPrefix}-${index}`)}</a>;
  });
}

export function LongformArticle({ markdown, topicHref, topicName }: LongformArticleProps) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || line === '---') { index += 1; continue; }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const key = `heading-${index}`;
      blocks.push(heading[1].length === 2 ? <h2 key={key}>{renderInline(heading[2], key)}</h2> : <h3 key={key}>{renderInline(heading[2], key)}</h3>);
      index += 1;
      continue;
    }

    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith('>')) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${index}`}>{quote.map((item, quoteIndex) => <p key={quoteIndex}>{renderInline(item, `quote-${index}-${quoteIndex}`)}</p>)}</blockquote>);
      continue;
    }

    if (index + 1 < lines.length && line.includes('|') && isMarkdownTableSeparator(lines[index + 1])) {
      const header = markdownTableCells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].includes('|') && markdownTableCells(lines[index]).length === header.length) {
        rows.push(markdownTableCells(lines[index]));
        index += 1;
      }
      blocks.push(<div className="longform-table-wrap" key={`table-${index}`}><table><thead><tr>{header.map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell, `th-${index}-${cellIndex}`)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell, `td-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    const list = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (list) {
      const ordered = /\d+\./.test(list[2]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*([-*]|\d+\.)\s+(.+)$/);
        if (!item || /\d+\./.test(item[1]) !== ordered) break;
        items.push(item[2]); index += 1;
      }
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, `list-${index}-${itemIndex}`)}</li>)}</List>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3})\s+|^>|^\s*([-*]|\d+\.)\s+/.test(lines[index]) && !(lines[index].includes('|') && isMarkdownTableSeparator(lines[index + 1] ?? ''))) {
      paragraph.push(lines[index].trim()); index += 1;
    }
    const key = `paragraph-${index}`;
    blocks.push(<p key={key}>{renderInline(paragraph.join(' '), key)}</p>);
  }

  return <div className="longform-content">
    {blocks}
    <section className="longform-continue-reading" aria-labelledby="continue-reading-title">
      <h2 id="continue-reading-title">이 주제를 더 살펴보세요</h2>
      <p>읽은 내용을 바탕으로, 나에게 맞는 다음 질문을 정리할 수 있는 건강 노트를 이어서 살펴보세요.</p>
      <a className="button button-primary" href={topicHref}>{topicName} 건강 노트 살펴보기</a>
    </section>
  </div>;
}
