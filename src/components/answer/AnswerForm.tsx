'use client';

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useFetch } from '@/hooks/useFetch';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMe } from '@/api/auth';
import { addAnswer } from '@/api/answers';

type Props = { questionId: number };

export default function AnswerForm({ questionId }: Props) {
  // const { user } = useAuth();
  // const fetchWithAuth = useFetch();

  const [content, setContent] = useState<string>('');

  const queryClient = useQueryClient();

  // ✅ 유저 정보 가져오기 (무한 캐싱 중)
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    staleTime: Infinity,
  });

  const user = userData?.user;

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newAnswer: { questionId: number; content: string }) =>
      addAnswer(questionId, content),
    onSuccess: () => {
      setContent('');

      // queryClient.invalidateQueries({ queryKey: ['answers', 'user', questionId, user?.id] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.answers.me(questionId, user!.id) });

      // 마이페이지(내가 답변한 질문 목록)도 다시 불러오도록 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.questions.answeredByMe(user!.id) });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutate({ questionId, content });
  };

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
    <form onSubmit={handleSubmit} aria-label="답변 등록 폼">
      <textarea
        required
        value={content}
        placeholder="여기에 답변을 입력하세요."
        className="focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring focus:outline-none"
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      {isError && <div className="text-error text-sm">{error.message}</div>}
      <div className="flex justify-end">
        <button
          type="submit"
          className="font-content bg-primary cursor-pointer rounded-lg px-5 py-2 text-white"
        >
          {isPending ? <Spinner /> : '등록'}
        </button>
      </div>
    </form>
  );
}
