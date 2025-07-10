/*
 * [신규] 파일: /src/app/api/[...path]/route.ts
 * 역할: 클라이언트의 모든 API 요청을 가로채 백엔드로 전달하는 BFF 프록시(Proxy)입니다.
 * 변경 이유:
 * - 클라이언트 측 코드가 토큰의 존재를 전혀 알 필요 없게 만듭니다.
 * - 이 프록시가 클라이언트 대신 안전하게 쿠키에서 accessToken을 읽어
 * Authorization 헤더에 담아 실제 백엔드로 요청을 전달합니다.
 * - 모든 API 통신 창구를 하나로 통일하여 관리를 용이하게 합니다.
 */
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handler(req: NextRequest) {
  const path = req.nextUrl.pathname.replace('/api/', '/api/');
  const url = `${API_URL}${path}${req.nextUrl.search}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = new Headers(req.headers);
  headers.delete('cookie'); // 기존 쿠키는 제거

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers,
      body: req.body,
      // duplex: 'half'는 body가 있는 요청(POST, PUT 등)에서 필요합니다.
      // @ts-ignore
      duplex: 'half',
    });

    // 백엔드의 응답을 그대로 클라이언트에 스트리밍합니다.
    return response;
  } catch (error) {
    console.error(`API Proxy Error for ${url}:`, error);
    return NextResponse.json({ message: 'API 통신 오류' }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
