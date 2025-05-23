import { MetadataRoute } from 'next';
import { getQuestions } from '@/api/questions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.interview-town.com';

  // 사이트맵에 추가할 ‘정적’ 페이지들
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
  ];

  const { questions } = await getQuestions();

  // 각 질문 상세 페이지 URL 생성
  // 질문 상세 경로: /questions/[category]/[id]
  // updatedAt 을 lastModified 로 사용
  for (const q of questions) {
    routes.push({
      url: `${baseUrl}/questions/${q.category.name}/${q.id}`,
      lastModified: q.updatedAt,
    });
  }

  return routes;
}
