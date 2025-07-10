/*
 * [신규] 파일: /src/lib/api/answers.ts
 * 역할: '답변' 데이터와 관련된 모든 API 호출 함수를 관리합니다.
 * 이 파일의 함수들은 서버 환경에서만 실행되도록 설계되었습니다.
 */
import { cookies } from 'next/headers';
import type { AnswerWithUser } from '@/types/answer';
import { PaginatedResponse } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 특정 질문에 대한 현재 로그인된 사용자의 답변을 가져옵니다.
 */
export async function getMyAnswer(questionId: number): Promise<AnswerWithUser[]> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return [];
  }

  const response = await fetch(`${API_URL}/api/question/${questionId}/answers/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('답변 목록 불러오기 실패');
  }

  const responseData = await response.json();

  return responseData.data.answers;
}

// export const getAnswers = async ({
//   pageParam = 1,
//   questionId,
// }: {
//   pageParam?: number;
//   questionId: number;
// }): Promise<AnswerResponse> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
//   );
//
//   if (!response.ok) {
//     throw new Error('답변 목록 불러오기 실패');
//   }
//
//   return response.json();
// };

/**
 * 특정 질문에 대한 답변 목록을 페이지네이션하여 가져옵니다. (공개 API)
 * @param {number} questionId - 질문의 ID
 * @param {number} page - 페이지 번호
 * @param {number} pageSize - 페이지 당 아이템 수
 * @returns {Promise<PaginatedResponse<AnswerWithUser[]>>} 페이지네이션된 답변 데이터
 */
export async function getAnswers(
  questionId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<AnswerWithUser[]>> {
  const response = await fetch(
    `${API_URL}/api/questions/${questionId}/answers?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) {
    throw new Error('답변 목록을 불러오는 데 실패했습니다.');
  }

  return response.json();
}

export const addAnswer = async (questionId: number, content: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${questionId}/answers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO signin 기능 생기기 전까지 userId 는 모두 1 으로 저장
      body: JSON.stringify({ userId: 1, content }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || '알 수 없는 오류가 발생했습니다.';
    throw new Error(message);
  }
};
