'use client';

import { addAnswer } from '@/services/answers';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = { questionId: number };

export default function AnswerForm({ questionId }: Props) {
  const [content, setContent] = useState<string>('');

  console.log('content : ', content);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ questionId, content }: { questionId: number; content: string }) =>
      addAnswer(questionId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers', questionId] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ questionId, content });
    setContent('');
  };

  return (
    <form className="relative flex-1" onSubmit={handleSubmit}>
      <textarea
        value={content}
        placeholder="여기에 답변을 입력하세요."
        className="w-full resize-none rounded-lg bg-gray-100 px-4 py-2 pr-16 text-sm text-black"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="font-content absolute right-2 bottom-4 cursor-pointer self-end rounded-lg bg-blue-500 px-3 py-2 text-sm"
      >
        등록
      </button>
    </form>
  );
}
