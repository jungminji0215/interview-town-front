import { ROUTES } from '@/constants/routes';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수입니다' })
    .email({ message: '유효한 이메일 주소를 입력해주세요' })
    .trim(),
  password: z.string().min(6, { message: '비밀번호는 6글자 이상이어야 합니다' }).trim(),
});

export const signUp = async (prevState: unknown, formData: FormData) => {
  const result = authSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      email: formData.get('email'),
      password: formData.get('password'),
    };
  }

  const { email, password } = result.data;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  console.log('data :>> ', data);

  redirect(ROUTES.LOGIN);
};

export const login = async (prevState: unknown, formData: FormData) => {
  console.log('========== login ==========');

  // 유효성 검사
  const result = authSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // 로그인 요청
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // TODO 나중에 refresh token 테스트
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
};

export const getSession = async (token: string) => {
  // TODO 임시 -> 쿠키에서 조회하는 것으로 변경
  if (!token) {
    return null;
  }

  /** 토큰 검증 하고 새 토큰 발습 */
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }

  const data = await response.json();

  return data;
};

export const logout = async () => {};
