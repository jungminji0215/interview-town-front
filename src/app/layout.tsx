import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Providers from '@/providers/QueryProvider';
import ThemeProvider from '@/theme/ThemeProvider';

import AuthSession from '@/components/AuthSession';
import { auth } from '@/auth'; // 서버컴포넌트는 이거로 유저 정보 가져올 수 있음

export const metadata: Metadata = {
  metadataBase: new URL('https://www.interview-town.com'),
  title: {
    default: '면접 타운',
    template: '%s - 면접 타운',
  },
  description:
    '개발자 면접 준비가 어려우신가요? 면접 타운에서 질문을 모아보고 동료 답변을 함께 확인해보세요.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // // 서버 컴포넌트는 auth()로 유저정보 가져올 수 있음
  // const session = await auth();
  // console.log('session : ', session);

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthSession>
            <Providers>
              <Navbar />
              <main>{children}</main>
            </Providers>
          </AuthSession>
        </ThemeProvider>
      </body>
    </html>
  );
}
