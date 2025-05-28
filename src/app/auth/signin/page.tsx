import LoginForm from '@/components/LoginForm';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
  return (
    <section className="mx-auto flex h-full max-w-5xl items-center justify-center p-5">
      <div className="w-full max-w-[23rem] bg-white p-5">
        <div className="font-title pt-3 pb-5 text-center text-2xl">로그인</div>

        {/* 로그인 Form */}
        <LoginForm />

        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="font-content text-xs text-gray-300">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex justify-center gap-3">
          <Image
            src={'/signin-google.svg'}
            alt="구글 로그인"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <Image
            src={'/signin-github.svg'}
            alt="깃허브 로그인"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </div>

        {/* 회원가입 페이지 이동 버튼 */}
        <div className="py-1 pt-3 text-center">
          <Link href={ROUTES.SIGN_UP}>
            <span className="font-content text-sm text-gray-600 hover:text-gray-500">회원가입</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
