"use client";

import React, { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { signUp } from "@/services/auth";

/* TODO input 공통 컴포넌트 */
export default function SignUpForm() {
  // { data: { nickname: 'tt' } }
  const [state, signUpAction] = useActionState(signUp, undefined);

  return (
    <form className="flex flex-col gap-3" action={signUpAction}>
      <input
        id="userId"
        name="userId"
        placeholder="아이디를 입력해주세요."
        type="text"
        className="border-2 rounded-md p-2 text-sm font-content"
      />
      {state?.errors?.userId && (
        <p className="text-red-500 text-xs px-2">{state.errors.userId}</p>
      )}
      <input
        id="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        className="border-2 rounded-md p-2 text-sm font-content"
      />
      {state?.errors?.password && (
        <p className="text-red-500 text-xs px-2">{state.errors.password}</p>
      )}
      <input
        id="nickname"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요."
        className="border-2 rounded-md p-2 text-sm font-content"
      />
      {state?.errors?.nickname && (
        <p className="text-red-500 text-xs px-2">{state.errors.nickname}</p>
      )}
      <SubmitButton>회원가입</SubmitButton>
    </form>
  );
}
