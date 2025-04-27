"use client";

import { login } from "@/services/auth";
import React, { useActionState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  // TODO 임시
  const router = useRouter();
  useEffect(() => {
    if (state?.data?.token) {
      console.log("state?.data?.token :>> ", state?.data?.token);
      localStorage.setItem("accessToken", state.data.token);

      router.push("/");
    }
  }, [state, router]);

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
