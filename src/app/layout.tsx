import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Providers from '@/providers/QueryProvider';

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
