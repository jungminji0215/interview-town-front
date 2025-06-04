'use client';

import React from 'react';
import AnswerItem from './AnswerItem';
import { useAuth } from '@/context/AuthContext';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useFetch } from '@/hooks/useFetch';
import { AnswerWithUser } from '@/types/answer';

type Props = {
  questionId: number;
};

export default function MyAnswerList({ questionId }: Props) {
  const { user } = useAuth();
  const fetchWrapper = useFetch();

  // 로그인 안 했으면 렌더링 안 함
  if (!user) {
    return null;
  }

  const { data: answers } = useSuspenseQuery<AnswerWithUser[]>({
    queryKey: ['answers', 'user', questionId, user.id],
    queryFn: async () => {
      const res = await fetchWrapper(`/api/question/${questionId}/answers/me`);
      return res.data.answers;
    },
    // enabled: !!user?.id, // useSuspenseQuery 는 해당 옵션이 없어서 사용하지 못 함
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (answers.length === 0) {
    return (
      <section className="card">
        <h3 className="text-h3 mb-4 font-semibold">나의 답변</h3>
        <div className="text-center text-gray-400">
          <p>답변을 등록해보세요. 😆</p>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h3 className="text-h3 mb-4 font-semibold">나의 답변</h3>
      <ul className="flex flex-col gap-5">
        {answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </ul>
    </section>
  );
}
