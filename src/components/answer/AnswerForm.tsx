/*
 * [리팩토링] 파일: /src/components/answer/AnswerForm.tsx
 * 역할: 답변 등록 UI 및 사용자 입력 처리.
 * 변경 이유:
 * - useMutation, useQueryClient, useFetch, useState 등 복잡한 훅을 모두 제거합니다.
 * - `action` 속성을 사용하여 Server Action과 직접 통신하는 가장 현대적이고 간단한 방식으로 변경합니다.
 * - `useActionState`와 `useFormStatus`를 통해 서버의 로딩 상태와 성공/실패 결과를 우아하게 처리합니다.
 * - `useEffect`를 사용하여, 답변 등록 성공 시 폼의 입력 내용을 자동으로 비워줍니다.
 */
'use client';

import React, { useActionState, useEffect, useRef, useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useFormStatus } from 'react-dom';
import { createAnswer } from '@/lib/actions/answer-actions';
import { User } from '@/types/user';
type Props = {
  questionId: number;
  user: User | null;
};
export default function AnswerForm({ questionId, user }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(createAnswer, undefined);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  // const [content, setContent] = useState<string>('');
  //
  // const queryClient = useQueryClient();
  //
  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationFn: async (newAnswer: { questionId: number; content: string }) => {
  //     // 백엔드 API 엔드포인트: POST /api/questions/:id/answers
  //     const url = `/api/questions/${newAnswer.questionId}/answers`;
  //     const body = JSON.stringify({ content: newAnswer.content });
  //     // fetchWithAuth가 자동으로 Authorization 헤더를 붙여줌
  //     return await fetchWithAuth(url, {
  //       method: 'POST',
  //       body,
  //     });
  //   },
  //   onSuccess: () => {
  //     setContent('');
  //
  //     // queryClient.invalidateQueries({ queryKey: ['answers', 'user', questionId, user?.id] });
  //     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.answers.me(questionId, user!.id) });
  //
  //     // 마이페이지(내가 답변한 질문 목록)도 다시 불러오도록 무효화
  //     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.questions.answeredByMe(user!.id) });
  //   },
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!content.trim()) return;
  //   mutate({ questionId, content });
  // };

  if (!user) {
    return (
      <div className="rounded-lg p-6 text-center">
        <p className="mb-4 text-gray-400">
          답변을 달려면 <strong>로그인</strong>이 필요합니다.
        </p>
        <Link
          href={ROUTES.SIGN_IN}
          className="btn-primary inline-block rounded px-4 py-2 text-white"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} aria-label="답변 등록 폼">
      {/* questionId를 Server Action에 전달하기 위한 hidden input */}
      <input type="hidden" name="questionId" value={questionId} />

      <textarea
        required
        // value={content}
        name="content"
        placeholder="여기에 답변을 입력하세요."
        className="focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:outline-none"
        // onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      {state?.error && <div className="text-error text-sm">{state.error}</div>}
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-content bg-primary cursor-pointer rounded-lg px-5 py-2 text-white disabled:opacity-50"
    >
      {pending ? <Spinner /> : '등록'}
    </button>
  );
}
