import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Providers from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: '면접 타운',
  description: '개발자 면접을 함께 연습하는 공간',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: '면접 타운',
    description: '면접 준비가 필요할때, 면접 타운',
    url: 'https://www.interview-town.com',
    siteName: '면접 타운',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'thumbnail image',
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
