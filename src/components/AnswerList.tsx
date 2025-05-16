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
    <>
      <ul className="flex flex-col gap-5">
        {answers.length > 0 ? (
          answers.map((answer) => <AnswerItem key={answer.id} answer={answer} />)
        ) : (
          <div className="text-center text-gray-400">
            앗! 아무 답변이 없네요. <br />
            제일 먼저 답변해보세요. 😉
          </div>
        )}
      </ul>

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
