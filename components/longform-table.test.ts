import assert from 'node:assert/strict';
import test from 'node:test';
import { isMarkdownTableSeparator, markdownTableCells } from './longform-table.js';

test('recognizes Markdown table separators with more than three columns', () => {
  assert.equal(isMarkdownTableSeparator('| --- | :---: | ---: | --- | --- |'), true);
  assert.deepEqual(markdownTableCells('| A | B | C | D | E |'), ['A', 'B', 'C', 'D', 'E']);
});

test('does not mistake ordinary pipe-delimited prose for a table separator', () => {
  assert.equal(isMarkdownTableSeparator('| A | B | C | D |'), false);
});
