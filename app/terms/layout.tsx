import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: '원온 이용약관: 건강 정보의 일반적 안내 범위, 이용자 책임, 출처와 외부 링크 기준을 안내합니다.',
};

export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
