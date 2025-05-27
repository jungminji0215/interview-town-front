import SignUpForm from '@/components/SignUpForm';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import React from 'react';

export default function SignUpPage() {
  return (
    <section className="mx-auto mt-40 flex max-w-5xl items-center justify-center">
      <div className="w-full max-w-[23rem] p-5">
        <div className="pt-3 pb-5 text-center text-2xl">회원 가입</div>

        <SignUpForm />

        {/* 로그인 페이지 이동 버튼 */}
        <div className="flex items-center justify-center gap-2 py-1 pt-5">
          <p className="font-content text-sm">이미 아이디가 있으신가요?</p>
          <Link href={ROUTES.LOGIN}>
            <span className="font-content text-sm hover:text-gray-500">로그인</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
