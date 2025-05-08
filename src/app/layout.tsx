import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Providers from '@/providers/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.interview-town.com'),
  title: '면접 타운',
  description:
    '개발자 면접 준비가 어려우신가요? 면접 타운에서 질문을 모아보고 동료 답변을 함께 확인해보세요.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: '면접 타운 | 개발자 면접을 함께 연습하는 공간',
    description: '질문과 동료의 답변을 한 곳에서! 면접 타운에서 더 똑똑하게 준비하세요.',
    url: 'https://www.interview-town.com',
    siteName: '면접 타운',
    images: [
      {
        url: '/open-graph-image.png',
        width: 1200,
        height: 630,
        alt: '면접 타운 썸네일 이미지',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-body bg-gray-50">
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
