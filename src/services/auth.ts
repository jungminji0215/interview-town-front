"use server";

import { ROUTES } from "@/constants/routes";
import { redirect } from "next/navigation";
import { z } from "zod";

// TODO 파일 분리
const baseAuthSchema = z.object({
  // TODO 조건 수정
  userId: z.string().min(1, { message: "아이디는 1글자 이상" }).trim(),
  password: z.string().min(1, { message: "비밀번호는 1글자 이상" }).trim(),
});

const loginSchema = baseAuthSchema;

const signUpSchema = baseAuthSchema.extend({
  nickname: z.string().min(1, { message: "닉네임은 1글자 이상" }).trim(),
});

export const signUp = async (prevState, formData: FormData) => {
  console.log("========== login ==========");

  const result = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId, password, nickname } = result.data;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password, nickname }),
    }
  );

  const data = await response.json();

  console.log("data :>> ", data);

  redirect(ROUTES.LOGIN);
};

export const login = async (prevState, formData: FormData) => {
  console.log("========== login ==========");

  // 유효성 검사
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId, password } = result.data;

  // 로그인 요청
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // TODO 나중에 refresh token 테스트
      body: JSON.stringify({ userId, password }),
    }
  );

  const data = await response.json();

  return data;
};

export const getSession = async (token: string) => {
  // TODO 임시 -> 쿠키에서 조회하는 것으로 변경
  if (!token) {
    return null;
  }

  /** 토큰 검증 하고 새 토큰 발습 */
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }

  const data = await response.json();

  return data;
};

export const logout = async () => {};
