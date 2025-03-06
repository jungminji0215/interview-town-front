"use client";

import { login } from "@/services/auth";
import React, { useActionState } from "react";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form className="flex flex-col gap-3" action={loginAction}>
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
      <SubmitButton>로그인</SubmitButton>
    </form>
  );
}
