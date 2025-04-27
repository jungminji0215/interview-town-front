import { Answer } from '@/types/answer';

export const getAnswers = async ({
  pageParam = 1,
  questionId,
}: {
  pageParam?: number;
  questionId: number;
}): Promise<Answer> => {
  // await delay(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
  );

  if (!response.ok) {
    throw new Error('답변 목록 불러오기 실패');
  }

  return response.json();
};
