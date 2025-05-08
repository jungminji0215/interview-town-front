import { AnswerResponse } from '@/types/answer';

export const getAnswers = async ({
  pageParam = 1,
  questionId,
}: {
  pageParam?: number;
  questionId: number;
}): Promise<AnswerResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
  );

  if (!response.ok) {
    throw new Error('답변 목록 불러오기 실패');
  }

  return response.json();
};

export const addAnswer = async (questionId: number, content: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO login 기능 생기기 전까지 userId 는 모두 1 으로 저장
      body: JSON.stringify({ userId: 1, content }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || '알 수 없는 오류가 발생했습니다.';
    throw new Error(message);
  }
};
