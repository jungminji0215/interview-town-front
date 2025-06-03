// components/MyAnswerList.tsx
'use client';

import React from 'react';
import AnswerItem from './AnswerItem';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useFetch } from '@/hooks/useFetch';
import { AnswerWithUser } from '@/types/answer';

type Props = {
  questionId: number;
};

export default function MyAnswerList({ questionId }: Props) {
  const { user } = useAuth();
  const fetchWrapper = useFetch();

  const { data: answers = [], isLoading } = useQuery<AnswerWithUser[]>({
    queryKey: ['answers', 'user', questionId, user?.id],
    queryFn: async () => {
      // “로그인된 user”가 있을 때만 호출(없으면 빈 배열)
      const res = await fetchWrapper(`/api/question/${questionId}/answers/me`);

      return res.data.answers;
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!user) return null;

  if (isLoading) return <div>로딩</div>;

  return (
    <section className="card">
      <h3 className="text-h3 mb-4 font-semibold">나의 답변</h3>
      {answers.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {answers.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-400">
          <p>답변을 등록하세요.</p>
        </div>
      )}
    </section>
  );
}
