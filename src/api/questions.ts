import { notFound } from 'next/navigation';

export const fetchQuestions = async (page: number, category?: string) => {
  const params = new URLSearchParams();

  params.set('page', String(page));

  if (category && category !== 'all') {
    params.set('category', category);
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions?${params.toString()}`;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('질문 목록 불러오기 실패');
  }

  const { data } = await response.json();

  return data;
};
