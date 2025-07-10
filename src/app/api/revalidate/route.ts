import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * 클라이언트 컴포넌트가 보내는 모든 API 요청을 대신 받아 처리하는 프록시 서버입니다.
 *
 * 클라이언트를 대신하여, 요청에 HttpOnly 쿠키의 accessToken을 꺼내 Authorization 헤더에 담아
 * 실제 백엔드로 안전하게 전달하는 역할을 합니다.

 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const { tag } = await request.json();

  if (!tag) {
    return NextResponse.json({ message: 'Tag is required' }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
