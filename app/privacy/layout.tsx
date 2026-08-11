import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: '원온 개인정보 처리방침: 수집하지 않는 정보, Google Analytics·AdSense 사용, 문의 방법을 안내합니다.',
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
