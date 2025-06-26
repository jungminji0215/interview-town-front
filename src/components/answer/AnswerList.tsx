'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import AnswerItem from './AnswerItem';
import React from 'react';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';
import { useFetch } from '@/hooks/useFetch';
import { getAnswers } from '@/api/answers';

type Props = {
  questionId: number;
};

export default function AnswerList({ questionId }: Props) {
  // const { user } = useAuth();
  //
  // const fetchWrapper = useFetch();

  console.log('질문 상세 페이지에서 답변을 조회할께');

  // TODO 리팩토링
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['answers', questionId],
    queryFn: ({ pageParam = 1 }) => getAnswers({ questionId, pageParam }),
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

  return (
    <>
      <ul className="flex flex-col gap-5">
        {answers.map((answer) => (
          <AnswerItem key={answer.id} answer={answer} />
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
