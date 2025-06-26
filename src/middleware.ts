import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import isValidToken, { isExpired } from '@/lib/jwt';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

/**
 * 특정 경로에 대해 로그인 여부 검사하고 리다이렉트 하는 역할만
 */
export async function middleware(req: NextRequest) {
  console.log(
    '==================  ==================  middleware ================== ================== ',
  );
  const { pathname } = req.nextUrl;

  console.log('=== pathname : ', pathname);

  const cookies = req.cookies;
  const isApi = pathname.startsWith('/api');
  const accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  console.log('=== accessToken : ', accessToken);
  console.log('=== refreshToken : ', refreshToken);

  /**
   * ==================== 페이지 접근 제어 ====================
   */

  // 로그인한 사용자가 /auth 접근 → 홈으로
  if (refreshToken && pathname.startsWith('/auth')) {
    console.log('로그인 했는데 로그인페이지랑, 회원가입 페이지에 접근?');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 로그인하지 않은 사용자가 보호된 경로 접근 → 로그인 페이지로
  if (!refreshToken && pathname.startsWith('/mypage')) {
    console.log('로그인하지 않은 사용자');

    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (!isApi) return NextResponse.next();

  /**
   * ==================== API 요청 전용 인증 인터셉트 ====================
   */
  console.log('==================== API 요청 전용 인증 인터셉트 ====================');
  const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
    accesstoken: accessToken,
    refreshtoken: refreshToken,
  });

  // 리프레시 토큰이 유효하지 않다면 바로 로그인 페이지로
  if (!isRefreshTokenValid) {
    console.log('유효하지 않음~~~~');
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // accessToken이 없거나 만료되었으면 → 재발급
  if (!isAccessTokenValid) {
    console.log('만료~~~~');
    // const cookieHeader = req.headers.get('cookie');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refreshToken`, {
      method: 'GET',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    const response = NextResponse.next();

    const resCookies = new ResponseCookies(res.headers);

    ['accessToken', 'refreshToken'].forEach((key) => {
      const cookie = resCookies.get(key);
      if (cookie) {
        response.cookies.set(key, cookie.value, {
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          sameSite: cookie.sameSite,
          secure: cookie.secure,
        });
      }
    });
    return response;
  }

  // ccessToken 유효하면 Authorization 헤더 추가
  const headers = new Headers(req.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);

  return NextResponse.next({
    request: {
      headers,
    },
  });

  // return fetch(new Request(req.url, { method: req.method, headers, body: req.body }));
  // // }
  //
  // // return NextResponse.next();
}

export const config = { matcher: ['/api/:path*', '/mypage/:path*', '/auth/:path*'] };

/**
 *  1.	공개 페이지 (/questions, /questions/:category/:id)는 로그인 없이 접근 가능해야 함
 *  2.	보호된 페이지 (/mypage/*)는 로그인 안 하면 /auth/signin으로 리다이렉트
 *  3.	API 요청 중 인증이 필요한 경로만 토큰 검사 + 재발급 처리
 *  4.	가능한 한 깔끔한 조건 분기로 middleware.ts 정리
 */
