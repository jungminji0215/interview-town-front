import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Vercel의 PREVIEW 환경이나 로컬 개발에선 크롤링 비허용
  const isProd = process.env.VERCEL_ENV === 'production';

  return {
    rules: [
      {
        userAgent: '*',
        allow: isProd ? '/' : [], // 프로덕션에만 전 페이지 허용
        disallow: isProd ? [] : ['/'], // 그 외 환경은 전 페이지 금지
      },
    ],
    sitemap: isProd ? 'https://interview-town.com/sitemap.xml' : undefined, // 로컬/미리보기엔 sitemap 노출 안 함
  };
}
