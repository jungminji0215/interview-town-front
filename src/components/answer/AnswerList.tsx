// 'use client';
//
// import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
// import AnswerItem from './AnswerItem';
// import React from 'react';
// import Spinner from '@/components/ui/Spinner';
// import { AnswerWithUser } from '@/types/answer';
//
// type Props = {
//   questionId: number;
//   initialData: PaginatedResponse<AnswerWithUser[]>; // 초기 데이터를 props로 받습니다.
// };
//
// const fetchAnswers = async ({
//   pageParam = 1,
//   questionId,
// }: {
//   pageParam: number;
//   questionId: number;
// }) => {
//   const response = await fetch(
//     `/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch answers');
//   }
//   return response.json();
// };
//
// export default function AnswerList({ questionId, initialData }: Props) {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
//     queryKey: ['answers', questionId],
//     queryFn: ({ pageParam }) => fetchAnswers({ pageParam, questionId }),
//
//     initialPageParam: 1,
//     getNextPageParam: (last) => {
//       const { currentPage, totalPages } = last.data.pagination;
//       return currentPage < totalPages ? currentPage + 1 : undefined;
//     },
//   });
//
//   const answers = data.pages.flatMap((p) => p.data.answers);
//
//   if (answers.length === 0) {
//     return (
//       <div className="text-center text-gray-400">
//         <p>아무도 답변을 등록하지 않았습니다. 🥲</p>
//       </div>
//     );
//   }
//
//   return (
//     <>
//       <ul className="flex flex-col gap-5">
//         {answers.map((answer) => (
//           <AnswerItem key={answer.id} answer={answer} />
//         ))}
//       </ul>
//
//       {hasNextPage && (
//         <div className="mt-4 flex justify-center">
//           <button
//             aria-label="다음 답변 불러오기"
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//             className="btn-primary flex h-10 w-24 cursor-pointer items-center justify-center disabled:opacity-50"
//           >
//             {isFetchingNextPage ? <Spinner /> : '더보기'}
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

/*
 * [리팩토링] 파일: /src/components/answer/AnswerList.tsx
 * 역할: '다른 사람의 답변' 목록을 무한 스크롤로 보여주는 UI 컴포넌트.
 * 변경 이유:
 * - 부모 컴포넌트로부터 `initialData`를 props로 받습니다.
 * - useSuspenseInfiniteQuery의 `initialData` 옵션을 사용하여, 서버에서 미리 가져온 데이터를
 * 초기 상태로 설정합니다. 이렇게 하면 클라이언트에서 불필요한 첫 페이지 데이터 요청이 발생하지 않아
 * 성능이 향상되고 사용자는 데이터를 즉시 볼 수 있습니다.
 */
'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import AnswerItem from './AnswerItem';
import React from 'react';
import Spinner from '@/components/ui/Spinner';
import type { PaginatedResponse } from '@/types/api';
import type { AnswerWithUser } from '@/types/answer';

type Props = {
  questionId: number;
  initialData: PaginatedResponse<AnswerWithUser[]>; // 초기 데이터를 props로 받습니다.
};

// API 호출 로직은 동일하게 유지됩니다.
const fetchAnswers = async ({
  pageParam = 1,
  questionId,
}: {
  pageParam: number;
  questionId: number;
}) => {
  const response = await fetch(
    `/api/questions/${questionId}/answers?page=${pageParam}&pageSize=10`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch answers');
  }
  return response.json();
};

export default function AnswerList({ questionId, initialData }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['answers', 'public', questionId], // 쿼리 키를 더 명확하게 변경
    queryFn: ({ pageParam }) => fetchAnswers({ pageParam, questionId }),
    initialPageParam: 1,
    // ★★★ 핵심 변경 ★★★
    // 서버에서 가져온 데이터를 초기 데이터로 설정합니다.
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data.pagination;
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
