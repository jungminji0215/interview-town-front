import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';
import SignInForm from '@/app/auth/_components/SignInForm';

export const metadata: Metadata = {
  title: '로그인 | 면접 타운',
  description: '면접 타운에 로그인해보세요.',
  openGraph: {
    title: '로그인 | 면접 타운',
    description: '면접 타운에 로그인해보세요.',
    url: 'https://www.interview-town.com/auth/signin',
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

export default function LoginPage() {
  return (
    <section className="mx-auto mt-40 flex max-w-5xl items-center justify-center">
      <div className="w-full max-w-[23rem] p-5">
        <div className="pb-10 text-center text-2xl">로그인</div>

        {/* 로그인 Form */}
        <SignInForm />

        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 border-t"></div>
          <p className="text-xs">OR</p>
          <div className="flex-1 border-t"></div>
        </div>

        {/* 회원가입 페이지 이동 버튼 */}
        <div className="pt-5 text-center">
          <Link href={ROUTES.SIGN_UP}>
            <span className="hover:text-primary">회원 가입</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
