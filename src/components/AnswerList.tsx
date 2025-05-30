'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import AnswerItem from './AnswerItem';
import React from 'react';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';

type Props = {
  questionId: number;
};

export default function AnswerList({ questionId }: Props) {
  const { user } = useAuth();

  const fetchWrapper = useFetch();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['answers', questionId, user?.id],
    queryFn: ({ pageParam = 1 }) =>
      fetchWrapper(`/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`, {
        method: 'GET',
      }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const { currentPage, totalPages } = last.data.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const answers = data.pages.flatMap((p) => p.data.answers);

  return (
    <>
      {answers.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {answers.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-400">
          앗! 아무 답변이 없네요. <br />
          제일 먼저 답변해보세요. 😉
        </div>
      )}

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button
            aria-label="다음 답변 불러오기"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn-primary flex h-10 w-24 cursor-pointer items-center justify-center disabled:opacity-50"
          >
            {isFetchingNextPage ? <Spinner /> : '더보기'}
          </button>
        </div>
      )}
    </>
  );
}
