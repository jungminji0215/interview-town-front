import { AnswerResponse, MyAnswerResponse } from '@/types/answer';

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
      credentials: 'include',
      body: JSON.stringify({ content }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    const message = data.message;
    throw new Error(message);
  }

  return data;
};

export const getMyAnswer = async (questionId: number): Promise<MyAnswerResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers/me`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('답변 목록 불러오기 실패');
  }

  return response.json();
};

export const updateAnswer = async (answerId: number, content: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/answers/${answerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '답변 수정에 실패했습니다.');
  }

  return response.json();
};

/**
 * 특정 답변을 삭제합니다.
 * @param answerId 삭제할 답변의 ID
 */
export const deleteAnswer = async (answerId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/answers/${answerId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '답변 삭제에 실패했습니다.');
  }

  return response.json();
};
