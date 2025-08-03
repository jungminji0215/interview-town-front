'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import AnswerItem from './AnswerItem';
import React from 'react';
import Spinner from '@/components/ui/Spinner';
import { getAnswers } from '@/lib/answers';
import { useSession } from 'next-auth/react';

type Props = {
  questionId: number;
};

export default function AnswerList({ questionId }: Props) {
  const { data: session } = useSession();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['answers', questionId],
    queryFn: ({ pageParam }) => getAnswers({ pageParam, questionId }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const { currentPage, totalPages } = last.data.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const answers = data.pages.flatMap((p) => p.data.answers);

  if (answers.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>아무도 답변을 등록하지 않았습니다. 🥲</p>
      </div>
    );
  }

  console.log('answers : ', answers);

  return (
    <>
      <ul className="flex flex-col gap-5">
        {answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} user={session?.user} />
        ))}
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
