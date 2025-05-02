import { notFound } from 'next/navigation';

export const getQuestions = async (page: number, category?: string) => {
  const params = new URLSearchParams();

  params.set('page', String(page));

  if (category && category !== 'all') {
    params.set('category', category);
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions?${params.toString()}`;

  const response = await fetch(url, { next: { revalidate: 30 } });

  if (!response.ok) {
    throw new Error('질문 목록 불러오기 실패');
  }

  const { data } = await response.json();
  return data;
};

export const getQuestion = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    if (response.status === 404) notFound();
    throw new Error('질문 상세 조회 실패');
  }

  const { data } = await response.json();
  return data;
};
