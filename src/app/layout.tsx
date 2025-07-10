import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Providers from '@/providers/QueryProvider';
import ThemeProvider from '@/theme/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';

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
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
            </AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
