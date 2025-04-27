import SignUpForm from "@/components/SignUpForm";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  // TODO 로그인 form 이랑 공통

  return (
    <section className="max-w-5xl mx-auto p-5 h-full flex items-center justify-center">
      <div className="bg-white max-w-[23rem] w-full p-5">
        {/* TODO HOME 으로 갈 수 있는 로고 */}
        <div className="text-center pt-3 pb-5 text-2xl font-title">
          회원 가입
        </div>

        <SignUpForm />

        {/* 로그인 페이지 이동 버튼 */}
        <div className="flex justify-center items-center gap-2 py-1 pt-5">
          <p className="text-sm text-gray-600 font-content">
            이미 아이디가 있으신가요?
          </p>
          <Link href={ROUTES.LOGIN}>
            <span className="text-sm text-gray-600 font-content hover:text-gray-500">
              로그인
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
