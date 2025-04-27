'use client';

import { addAnswer } from '@/services/answers';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = { questionId: number };

export default function AnswerForm({ questionId }: Props) {
  const [content, setContent] = useState<string>('');

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
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        placeholder="여기에 답변을 입력하세요."
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-black"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="font-content cursor-pointer rounded-lg bg-blue-500 px-5 py-2"
        >
          등록
        </button>
      </div>
    </form>
  );
}
