// /*
//  * [리팩토링] 파일: /src/middleware.ts
//  * 역할: 모든 요청에 대한 '게이트키퍼'.
//  * 변경 이유:
//  * - 기존의 단순 리다이렉트 기능을 넘어, 세션 관리의 핵심 역할을 수행합니다.
//  * - accessToken이 만료되었을 때, 사용자가 모르는 사이에 백그라운드에서
//  * refreshToken을 사용하여 토큰을 자동으로 재발급합니다.
//  * - 이를 통해 사용자 경험을 해치지 않으면서 세션을 안전하게 유지합니다.
//  */
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';
//
// // 환경 변수는 반드시 로드되어야 하므로 '!'를 사용하거나, 시작 시점에 확인하는 로직이 필요합니다.
// const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
// const API_URL = process.env.NEXT_PUBLIC_API_URL!;
//
// /**
//  * JWT 토큰의 유효성을 검사하는 유틸리티 함수.
//  * 만료되었거나 형식이 잘못되면 null을 반환합니다.
//  */
// async function verifyAccessToken(token: string) {
//   try {
//     await jwtVerify(token, ACCESS_TOKEN_SECRET);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }
//
// export async function middleware(req: NextRequest) {
//   console.log('===================== middleware ====================');
//   const accessToken = req.cookies.get('accessToken')?.value;
//   const refreshToken = req.cookies.get('refreshToken')?.value;
//
//   console.log('accessToken : ', accessToken);
//   console.log('refreshToken : ', refreshToken);
//
//   const { pathname } = req.nextUrl;
//
//   // 1. accessToken이 있고 유효한 경우 -> 요청을 그대로 통과시킵니다.
//   if (accessToken && (await verifyAccessToken(accessToken))) {
//     return NextResponse.next();
//   }
//
//   console.log('토큰 통과');
//
//   // 2. accessToken은 없거나 만료됐지만, refreshToken이 있는 경우 -> 토큰 재발급 시도
//   if (!accessToken && refreshToken) {
//     console.log('토큰 재발급 시도');
//     try {
//       // 백엔드의 재발급 API를 호출합니다.
//       const res = await fetch(`${API_URL}/api/refreshToken`, {
//         headers: { Cookie: `refreshToken=${refreshToken}` },
//       });
//
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Refresh failed');
//
//       // 재발급 성공 시, 새로운 accessToken을 쿠키에 설정하고 원래 요청을 계속 진행
//       const response = NextResponse.next();
//       response.cookies.set('accessToken', data.accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         path: '/',
//         maxAge: 15 * 60, // 15분
//       });
//       return response;
//     } catch (error) {
//       // 재발급 실패 시 (refreshToken 만료 등), 모든 토큰을 삭제하고 로그인 페이지로 보냅니다.
//       console.error('Middleware token refresh failed:', error);
//       const response = NextResponse.redirect(new URL('/auth/signin', req.url));
//       response.cookies.delete('accessToken');
//       response.cookies.delete('refreshToken');
//       return response;
//     }
//   }
//
//   // 3. 보호된 경로(예: /mypage)에 모든 토큰이 없는 상태로 접근 시 -> 로그인 페이지로 리다이렉트
//   if (pathname.startsWith('/mypage') && !refreshToken) {
//     return NextResponse.redirect(new URL('/auth/signin', req.url));
//   }
//
//   // 4. 로그인한 사용자가 로그인/회원가입 페이지 접근 시 -> 메인 페이지로 리다이렉트
//   if (
//     refreshToken &&
//     (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))
//   ) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
//
//   // 그 외 모든 경우는 요청을 그대로 통과시킵니다.
//   return NextResponse.next();
// }
//
// export const config = {
//   // 미들웨어가 모든 경로(API, 페이지)에서 실행되도록 설정 (정적 파일 제외)
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };
/*
 * 파일: /src/middleware.ts
 * 역할: 모든 요청에 대한 '게이트키퍼'.
 * 변경 이유:
 * - 토큰 재발급 로직의 조건문을 수정하여, accessToken이 '없을 때' 뿐만 아니라
 * '만료되었거나 유효하지 않을 때'에도 재발급을 시도하도록 변경합니다.
 * - 이를 통해 세션이 끊기는 문제를 해결하고 안정적인 로그인 상태를 유지합니다.
 *
 *
 * 페이지 이동이나 API 요청 등 모든 요청을 가장 먼저 가로채서 검사합니다.

주요 임무는 "이 요청이 유효한 accessToken을 가지고 있는가?" 를 확인하고,
* 만약 토큰이 만료되었다면 사용자가 모르는 사이에 조용히 재발급해주는 것입니다.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

/**
 * JWT 토큰의 유효성을 검사하고, 성공 시 payload를 반환합니다.
 * @returns {Promise<object | null>} 성공 시 payload, 실패 시 null
 */
async function getVerifiedTokenPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET, {
      algorithms: ['HS256'], // 사용할 알고리즘을 명확히 지정합니다.
    });

    return payload;
  } catch (error) {
    console.log('error : ', error);
    // 서명 불일치, 만료 등 모든 검증 실패 시 null을 반환합니다.
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const { pathname } = req.nextUrl;

  // accessToken을 먼저 검증합니다.
  const decodedTokenPayload = accessToken ? await getVerifiedTokenPayload(accessToken) : null;

  // 1. accessToken이 있고 유효한 경우 -> 요청을 그대로 통과시킵니다.
  if (decodedTokenPayload) {
    return NextResponse.next();
  }

  // ★★★ 핵심 변경 ★★★
  // 2. accessToken이 없거나 만료됐지만, refreshToken이 있는 경우 -> 토큰 재발급 시도
  if (!decodedTokenPayload && refreshToken) {
    console.log('토큰 만료');
    try {
      const res = await fetch(`${API_URL}/api/refreshToken`, {
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Refresh failed');

      // 재발급 성공 시, 새로운 accessToken을 쿠키에 설정하고 원래 요청을 계속 진행
      const response = NextResponse.next();
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 15 * 60, // 15분
      });
      return response;
    } catch (error) {
      // 재발급 실패 시 (refreshToken 만료 등), 모든 토큰을 삭제하고 로그인 페이지로 보냅니다.
      console.error('Middleware token refresh failed:', error);
      const response = NextResponse.redirect(new URL('/auth/signin', req.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  // 3. 보호된 경로(예: /mypage)에 모든 토큰이 없는 상태로 접근 시 -> 로그인 페이지로 리다이렉트
  if (pathname.startsWith('/mypage') && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // 4. 로그인한 사용자가 로그인/회원가입 페이지 접근 시 -> 메인 페이지로 리다이렉트
  if (
    refreshToken &&
    (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 그 외 모든 경우는 요청을 그대로 통과시킵니다.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
