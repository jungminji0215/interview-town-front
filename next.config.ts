import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  rewrites: async () => [
    { source: '/api/:path*', destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` },
  ],
};

export default nextConfig;

/**
 * 클라이언트(또는 middleware)에서 /api/*로 들어오는 요청을
 * 실제 백엔드 서버 http://localhost:3001/api/* 로 프록시
 *
 * 주의할 것은 서버 컴포넌트 내부의 fetch("/api/me") 이렇게 하면 아무런 영향이 없다.
 * rewrites 는 브라우저가 http://localhost:3000/api/... 로 보내는 요청을 Next.js 서버(3000) 에서
 * 실제 백엔드(30001)로 프록시 해준다.
 * 죽, 클라이언트가 /api/... 요청할 때만 동작한다.
 *
 * 서버컴포넌트의 fetch 는 Next.js 런타임 안에서 실행되는 코드이므로
 * 상태경로("/api/me") 를 해석할 기준(origin) 이 없어서 Invalid URL 에러가 발생한다.
 * 이 fetch 는 rewrites 를 타지 않고 그대로 fetch() 함수가 동작한다.
 */
