import { notFound } from 'next/navigation';
import { delay } from '@/utils/delay';

export const getQuestions = async (page?: number, category?: string) => {
  // await delay(3000);

  const params = new URLSearchParams();

  if (page) {
    params.set('page', String(page));
    params.set('pageSize', '10');
  }

  if (category && category !== 'all') {
    params.set('category', category);
  }

  const query = params.toString();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions${query ? `?${query}` : ''}`;

  const response = await fetch(url, { next: { revalidate: 10 } });

  if (!response.ok) {
    throw new Error('질문 목록 불러오기 실패');
  }

  const { data } = await response.json();
  return data;
};

export const getQuestion = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    if (response.status === 404) notFound();
    throw new Error('질문 상세 조회 실패');
  }

  const { data } = await response.json();
  return data;
};
