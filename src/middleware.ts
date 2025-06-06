import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 특정 경로에 대해 로그인 여부 검사하고 리다이렉트 하는 역할만
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshTokenCookie = req.cookies.get('refreshToken')?.value;

  // 1) 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근 시 → "/" 로 리다이렉트
  if (
    refreshTokenCookie &&
    (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 2) 로그인하지 않은 사용자가 마이페이지에 접근 시 → "/auth/signin" 으로 리다이렉트
  if (!refreshTokenCookie && pathname.startsWith('/mypage')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // 그 외 경로는 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/auth/:path*'],
};
