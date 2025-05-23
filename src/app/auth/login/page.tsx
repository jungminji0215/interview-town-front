import LoginForm from "@/components/LoginForm";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <section className="max-w-5xl mx-auto p-5 h-full flex items-center justify-center">
      <div className="bg-white max-w-[23rem] w-full p-5">
        <div className="text-center pt-3 pb-5 text-2xl font-title">로그인</div>

        {/* 로그인 Form */}
        <LoginForm />

        <div className="flex items-center  gap-2 my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="text-gray-300 text-xs font-content">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex gap-3 justify-center">
          <Image
            src={"/login-google.svg"}
            alt="구글 로그인"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <Image
            src={"/login-github.svg"}
            alt="깃허브 로그인"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </div>

        {/* 회원가입 페이지 이동 버튼 */}
        <div className="text-center pt-3 py-1">
          <Link href={ROUTES.SIGN_UP}>
            <span className="text-sm text-gray-600 font-content hover:text-gray-500">
              회원가입
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
