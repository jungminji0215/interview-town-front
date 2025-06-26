import { AnswerResponse } from '@/types/answer';

export const getAnswers = async ({
  pageParam = 1,
  questionId,
}: {
  pageParam?: number;
  questionId: number;
}): Promise<AnswerResponse> => {
  console.log('getAnswers');

  const response = await fetch(
    `/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  console.log('getAnswers response : ', response);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getMyAnswers = async (questionId: number) => {
  const response = await fetch(`/api/questions/${questionId}/answers/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addAnswer = async (questionId: number, content: string) => {
  const response = await fetch(`/api/questions/${questionId}/answers`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
