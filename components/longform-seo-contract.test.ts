import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const readSource = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

test('longform articles receive a topic-relevant, non-clinical internal CTA from the shared renderer', () => {
  const renderer = readSource('components/longform-article.tsx');
  const articlePage = readSource('app/article/[slug]/page.tsx');

  assert.match(renderer, /topicHref: string/);
  assert.match(renderer, /topicName: string/);
  assert.match(renderer, /className="longform-continue-reading"/);
  assert.match(renderer, /href=\{topicHref\}/);
  assert.match(renderer, /className="button button-primary"/);
  assert.match(renderer, /나에게 맞는 다음 질문을 정리/);
  assert.doesNotMatch(renderer, /진단|처방|치료를 결정/);
  assert.match(articlePage, /topicHref=\{`\/topic\/\$\{article\.topicSlug\}`\}/);
});

test('privacy and terms routes declare distinct document descriptions', () => {
  const privacyLayout = readSource('app/privacy/layout.tsx');
  const termsLayout = readSource('app/terms/layout.tsx');

  assert.match(privacyLayout, /개인정보 처리방침/);
  assert.match(termsLayout, /이용약관/);
  assert.notEqual(privacyLayout, termsLayout);
});
