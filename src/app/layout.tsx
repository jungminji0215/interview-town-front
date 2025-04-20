import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '면접 타운',
  description: '개발자 면접을 함께 연습하는 공간',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* TODO 글로벌 스타일 */}
      <body className="bg-dark-navy text-white">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
        {/*<main>{children}</main>*/}
      </body>
    </html>
  );
}
