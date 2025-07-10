/*
 * [신규] 파일: /src/lib/auth-actions.ts
 * 역할: 인증(로그인/로그아웃)과 관련된 서버 로직을 담당합니다.
 * 이 파일의 함수들은 서버에서만 실행되며, 브라우저에 노출되지 않습니다.
 * 변경 이유:
 * - Next.js App Router의 공식적인 데이터 변경 처리 방식인 Server Action을 사용합니다.
 * - 백엔드에서 받은 토큰을 `HttpOnly` 쿠키로 안전하게 설정하는 책임을 집니다.
 */
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// useFormState의 상태를 위한 타입 정의
type FormState = {
  error?: string;
};

type SignInSuccessResponse = {
  accessToken: string;
  refreshToken: string;
};

/**
 * 로그인 Server Action
 * @param prevState - useFormState 훅에서 전달하는 이전 상태
 * @param formData - Form에서 제출된 데이터
 */
export async function signIn(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get('email');
  const password = formData.get('password');

  let signInResponse: SignInSuccessResponse;

  try {
    const response = await fetch(`${API_URL}/api/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      switch (data.message) {
        case 'invalid_credentials':
          return { error: '이메일 또는 비밀번호를 확인해주세요.' };
        default:
          return { error: data.message || '로그인에 실패했습니다.' };
      }
    }

    signInResponse = data;
  } catch (error) {
    console.error('Sign-in action fetch error:', error);
    return { error: '서버와 통신 중 오류가 발생했습니다.' };
  }

  // ★★★ 핵심 로직 ★★★
  // 백엔드에서 받은 토큰을 Server Action에서 직접 쿠키로 설정합니다.
  try {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', signInResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 15 * 60, // 15분
    });
    cookieStore.set('refreshToken', signInResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7일
    });
  } catch (error) {
    console.error('Cookie setting error:', error);
    return { error: '쿠키 설정 중 오류가 발생했습니다.' };
  }

  // redirect는 에러를 throw하므로 try-catch 블록 바깥에서 호출해야 합니다.
  redirect(ROUTES.QUESTIONS);
}

/**
 * 로그아웃 Server Action
 */
export async function signOut() {
  // Next.js 서버에서 직접 쿠키를 삭제합니다.
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect(ROUTES.HOME);
}

// useFormState의 상태를 위한 타입 정의
type SignUpState = {
  error?: string; // 일반적인 에러 메시지
  fieldErrors?: {
    // 특정 필드에 대한 에러 메시지
    email?: string;
    password?: string;
  };
};

/**
 * 회원가입 Server Action
 * @param prevState - useFormState 훅에서 전달하는 이전 상태
 * @param formData - Form에서 제출된 데이터
 */
export async function signUp(
  prevState: SignUpState | undefined,
  formData: FormData,
): Promise<SignUpState> {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      // 백엔드 에러 메시지에 따라 필드별 에러를 반환
      switch (data.message) {
        case 'user_exist':
          return { fieldErrors: { email: '이미 사용 중인 이메일입니다.' } };
        case 'invalid_email':
          return { fieldErrors: { email: '올바른 이메일 형식이 아닙니다.' } };
        case 'password_too_short':
          return { fieldErrors: { password: '비밀번호는 6자 이상이어야 합니다.' } };
        default:
          return { error: data.message || '회원가입에 실패했습니다.' };
      }
    }
  } catch (error) {
    console.error('Sign-up action fetch error:', error);
    return { error: '서버와 통신 중 오류가 발생했습니다.' };
  }

  // 회원가입 성공 시 로그인 페이지로 리다이렉트
  redirect(ROUTES.SIGN_IN);
}
