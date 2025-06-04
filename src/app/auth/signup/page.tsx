import SignUpForm from '@/components/SignUpForm';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원 가입',
  description: '면접 타운에 회원 가입해보세요.',
  // openGraph: {
  //   title: '회원 가입',
  //   description: '면접 타운에 회원 가입해보세요.',
  //   url: 'https://www.interview-town.com/auth/signin',
  //   siteName: '면접 타운',
  //   images: [
  //     {
  //       url: '/open-graph-image.png',
  //       width: 1200,
  //       height: 630,
  //       alt: '면접 타운 썸네일 이미지',
  //     },
  //   ],
  // },
};

export default function SignUpPage() {
  return (
    <section className="mx-auto mt-40 flex max-w-5xl items-center justify-center">
      <div className="w-full max-w-[23rem] p-5">
        <div className="pb-10 text-center text-2xl">회원 가입</div>

        <SignUpForm />

        {/* 로그인 페이지 이동 버튼 */}
        <div className="flex items-center justify-center gap-2 py-1 pt-5">
          <p>이미 아이디가 있으신가요?</p>
          <Link href={ROUTES.SIGN_IN}>
            <span className="hover:text-primary">로그인</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
