import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <section className="max-w-5xl mx-auto p-5 h-full flex items-center justify-center">
      <div className="bg-white max-w-[23rem] w-full p-5 rounded-md border-2">
        <div className="text-center pt-3 pb-5 text-2xl">회원 가입</div>

        {/* 로그인 Form */}
        <form className=" flex flex-col gap-3">
          <input type="email" className="border-2 rounded-md p-2"></input>
          <input type="password" className="border-2 rounded-md p-2"></input>
          <button type="submit" className="rounded-md p-2 bg-yellow-300">
            회원 가입
          </button>
        </form>

        {/* 로그인 페이지 이동 버튼 */}
        <div className="flex justify-center items-center gap-2 py-1 pt-5">
          <p className="text-xs text-gray-600">이미 아이디가 있으신가요?</p>
          <Link href={ROUTES.LOGIN} className="text-xs text-gray-600">
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
}
