import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wonon.ehon365.kr'),
  alternates: { types: { 'application/rss+xml': '/rss.xml' } },
  title: { default: '원온 | 중년 여성의 건강 가이드', template: '%s | 원온' },
  description: '45세 이후 여성을 위한 갱년기·생활 건강 근거 기반 안내서. 불안을 덜고, 나에게 맞는 다음 행동을 찾도록 돕습니다.',
  openGraph: { type: 'website', locale: 'ko_KR', siteName: '원온', title: '원온 | 중년 여성의 건강 가이드', description: '45세 이후 여성을 위한 차분하고 근거 기반의 건강 안내서.' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="ko"><head>
        <meta name="naver-site-verification" content="9325fb1919d794cbd7665f8037e5c4cb47848ce7" />
        <link rel="alternate" type="application/rss+xml" title="원온 RSS" href="/rss.xml" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736" crossOrigin="anonymous"></script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GHW1NZJ8FE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-GHW1NZJ8FE');",
          }}
        />
      </head>
      <body>{children}</body></html>;
}
