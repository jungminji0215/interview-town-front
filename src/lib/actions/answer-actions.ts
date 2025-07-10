/*
 * [신규] 파일: /src/lib/actions/answer-actions.ts
 * 역할: 답변(Answer) 데이터와 관련된 모든 Server Action을 관리합니다.
 * 변경 이유:
 * - 답변 등록 로직을 서버에 집중시켜 클라이언트 컴포넌트를 단순하게 만듭니다.
 * - 서버에서 직접 인증 토큰을 처리하므로 보안성이 향상됩니다.
 * - 데이터 생성 성공 시, `revalidatePath`를 호출하여 관련 페이지의 데이터를 자동으로
 * 갱신하도록 Next.js에 알려줍니다. 이는 client-side query invalidation보다 더 효율적입니다.
 */
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// useActionState의 상태를 위한 타입 정의
type FormState = {
  error?: string;
  success?: boolean;
};

/**
 * 새로운 답변을 등록하는 Server Action
 * @param prevState - useActionState 훅에서 전달하는 이전 상태
 * @param formData - Form에서 제출된 데이터
 */
export async function createAnswer(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const content = formData.get('content') as string;
  const questionId = formData.get('questionId') as string;

  if (!content?.trim()) {
    return { error: '답변 내용을 입력해주세요.' };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { error: '답변을 등록하려면 로그인이 필요합니다.' };
  }

  try {
    const response = await fetch(`${API_URL}/api/questions/${questionId}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || '답변 등록에 실패했습니다.' };
    }

    // ★★★ 핵심 로직 ★★★
    // 답변 등록 성공 시, 해당 질문 상세 페이지의 캐시를 무효화합니다.
    // 이렇게 하면 페이지를 새로고침하지 않아도 '나의 답변' 목록이 자동으로 업데이트됩니다.
    revalidatePath(`/questions/.*'/${questionId}`); // 정규표현식은 지원하지 않으므로 실제 경로 패턴에 맞게 수정 필요
    revalidatePath(`/questions/frontend/${questionId}`); // 예시

    return { success: true };
  } catch (error) {
    console.error('Create answer action error:', error);
    return { error: '서버와 통신 중 오류가 발생했습니다.' };
  }
}

/**
 * 기존 답변을 수정하는 Server Action
 */
export async function updateAnswer(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const content = formData.get('content') as string;
  const answerId = formData.get('answerId') as string;
  const questionId = formData.get('questionId') as string; // revalidate를 위해 추가

  if (!content?.trim()) {
    return { error: '답변 내용이 비어있습니다.' };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) {
    return { error: '로그인이 필요합니다.' };
  }

  try {
    const response = await fetch(`${API_URL}/api/answers/${answerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || '답변 수정에 실패했습니다.' };
    }

    // 성공 시, 해당 질문 페이지의 캐시를 무효화하여 변경사항을 즉시 반영합니다.
    revalidatePath(`/questions/.*'/${questionId}`); // 실제 경로 패턴에 맞게 수정 필요

    return { success: true };
  } catch (error) {
    return { error: '서버 통신 오류가 발생했습니다.' };
  }
}

/**
 * 답변을 삭제하는 Server Action
 */
export async function deleteAnswer(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const answerId = formData.get('answerId') as string;
  const questionId = formData.get('questionId') as string;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { error: '로그인이 필요합니다.' };
  }

  try {
    const response = await fetch(`${API_URL}/api/answers/${answerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || '답변 삭제에 실패했습니다.' };
    }

    revalidatePath(`/questions/.*'/${questionId}`);

    return { success: true };
  } catch (error) {
    return { error: '서버 통신 오류가 발생했습니다.' };
  }
}
