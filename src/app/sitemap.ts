import { MetadataRoute } from 'next';
import { getQuestions } from '@/lib/question';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.interview-town.com';

  const { questions } = await getQuestions();

  return questions.map((q) => ({
    url: `${baseUrl}/questions/${q.category.name}/${q.id}`,
  }));
}
