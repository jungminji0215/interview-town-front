import { notFound } from 'next/navigation';
import { delay } from '@/utils/delay';

export const fetchAllQuestions = async (page: number = 1) => {
  await delay(5000);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions?page=${page}`, {
    cache: 'no-store',
  });

  console.log('response : ', response);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('질문 목록 불러오기 실패');
  }

  const { data } = await response.json();

  return data;
};
