// auth 함수를 호출하면 로그인 여부를 알 수 있다.
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// 미들웨어를 적용할 라우트
export const config = {
  // 로그인을 해야지만 접근 가능
  matcher: ['/mypage/:path*'],
};
