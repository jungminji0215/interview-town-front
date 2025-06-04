import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/components/Header';
import Providers from '@/providers/QueryProvider';
import ThemeProvider from '@/theme/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

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
  openGraph: {
    type: 'website',
    title: '개발자 면접을 함께 연습하는 공간 | 면접 타운',
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

type SessionResponse = {
  isLoggedIn: boolean;
  accessToken?: string;
  user?: User;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // TODO 깔끔하게 파일 분리

  // 1) 브라우저(클라이언트)가 보낸 쿠키( HttpOnly refreshToken )를 읽어옴
  //  cookies() 자체가 Promise<ReadonlyRequestCookies>를 반환하므로 반드시 await 해 주어야 함
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  // 2) Express API( /api/session ) 호출
  let sessionData: SessionResponse = { isLoggedIn: false };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // HttpOnly 쿠키( refreshToken )를 그대로 전달
        cookie: cookieHeader,
      },
    });
    if (response.ok) {
      sessionData = await response.json();
    }
  } catch (error) {
    console.error('세션 조회 오류:', error);
  }

  const initialUser = sessionData.isLoggedIn ? sessionData.user! : null;
  const initialToken = sessionData.isLoggedIn ? sessionData.accessToken! : null;

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider initialUser={initialUser} initialToken={initialToken}>
            <Providers>
              <Header />
              <main>{children}</main>
            </Providers>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
