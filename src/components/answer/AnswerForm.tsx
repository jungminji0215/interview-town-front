'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/ui/Spinner';
import { addAnswer } from '@/lib/answers';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { User } from 'next-auth';

type Props = {
  questionId: number;
  user: User | undefined;
};

export default function AnswerForm({ questionId, user }: Props) {
  const [content, setContent] = useState<string>('');

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newAnswer: { questionId: number; content: string }) =>
      addAnswer(newAnswer.questionId, newAnswer.content),
    onSuccess: () => {
      setContent('');

      queryClient.invalidateQueries({ queryKey: ['answers', questionId] });
      queryClient.invalidateQueries({ queryKey: ['answers', 'me', questionId, user?.id] });

      // 마이페이지(내가 답변한 질문 목록)도 다시 불러오도록 무효화
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.questions.answeredByMe(user.id) });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    mutate({ questionId, content });
  };

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
