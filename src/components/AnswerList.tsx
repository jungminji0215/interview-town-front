'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getAnswers } from '@/api/answers';
import AnswerItem from './AnswerItem';
import { LiaSpinnerSolid } from 'react-icons/lia';

type Props = {
  questionId: number;
};

export default function AnswerList({ questionId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery({
    queryKey: ['answers', questionId],
    queryFn: ({ pageParam }) => getAnswers({ pageParam, questionId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    suspense: true,
  });

  const answers = data?.pages.flatMap((page) => page.data.answers) ?? [];

  return (
    <section aria-labelledby="answers-heading">
      <h2 id="answers-heading" className="sr-only">
        답변 목록
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
            className="flex h-10 w-24 items-center justify-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? <LiaSpinnerSolid className="animate-spin text-2xl" /> : '더보기'}
          </button>
        </div>
      )}
    </section>
  );
}
