/*
 * 역할: 서버 환경에서 현재 로그인된 사용자의 정보를 가져옵니다.
 * 동작 원리:
 * - next/headers의 cookies() 함수를 사용하여 브라우저가 보낸 HttpOnly 쿠키를 안전하게 읽습니다.
 * - 쿠키에서 accessToken을 추출합니다.
 * - 이 토큰을 Authorization 헤더에 담아 백엔드의 /api/me 엔드포인트를 직접 호출합니다.
 * - 서버 컴포넌트나 Server Action에서 이 함수를 호출하여 현재 사용자 세션을 확인할 수 있습니다.
 *
 *
 *
 *
 *
 *
 * getUser() 함수가 있으며,
 * 서버 컴포넌트가 "현재 로그인한 사용자가 누구지?"를 확인할 때 사용하는 읽기 전용(Read-only) 유틸리티입니다.
 */
'use server';

import { cookies } from 'next/headers';
import type { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 서버 환경에서 현재 로그인된 사용자의 정보를 가져옵니다.
 * @returns {Promise<User | null>} 로그인된 경우 사용자 정보, 그렇지 않으면 null을 반환합니다.
 */
export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // accessToken이 쿠키에 없으면 로그인하지 않은 상태입니다.
  if (!accessToken) {
    return null;
  }

  try {
    // 서버 환경에서는 백엔드 API를 직접 호출합니다.
    const response = await fetch(`${API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store', // 세션 정보는 항상 최신 상태를 유지해야 하므로 캐시하지 않습니다.
    });

    // 토큰이 만료되었거나 유효하지 않아 401 에러 등이 발생한 경우
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user as User;
  } catch (error) {
    console.error('Failed to get user session:', error);
    return null;
  }
}
