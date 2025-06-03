import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 특정 경로에 대해 로그인 여부 검사하고 리다이렉트 하는 역할만
 *
 * 1) 보호된 경로(/mypage 및 하위 경로)에 접근 시
 *    - 브라우저 쿠키 중에 refreshToken이 없으면 /auth/signin으로 리다이렉트
 *    - 쿠키가 있으면 그대로 통과
 *
 * 2) matcher 옵션으로 /mypage로 시작하는 모든 URL에만 적용
 */
export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken');

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*'],
};
