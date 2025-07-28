import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next';
import SignInForm from '@/components/auth/SignInForm';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: '로그인',
  description: '면접 타운에 로그인해보세요.',
};

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect(ROUTES.HOME);
  }

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
