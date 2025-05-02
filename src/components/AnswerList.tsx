'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getAnswers } from '@/api/answers';
import AnswerItem from './AnswerItem';
import React from 'react';
import Spinner from '@/components/ui/Spinner';
import { AnswerResponse } from '@/types/answer';

type Props = {
  questionId: number;
};

export default function AnswerList({ questionId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['answers', questionId],
    queryFn: ({ pageParam }) => getAnswers({ pageParam, questionId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: AnswerResponse) => {
      const { currentPage, totalPages } = lastPage.data.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const answers = data?.pages.flatMap((page) => page.data.answers) ?? [];

  return (
    <section aria-labelledby="answers-heading">
      <h2 id="answers-heading" className="text-h3 mb-4 font-semibold text-black">
        답변
      </h2>

      <ul className="flex flex-col gap-5">
        {answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} />
        ))}
      </ul>

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn-primary flex h-10 w-24 cursor-pointer items-center justify-center disabled:opacity-50"
          >
            {isFetchingNextPage ? <Spinner /> : '더보기'}
          </button>
        </div>
      )}
    </section>
  );
}
