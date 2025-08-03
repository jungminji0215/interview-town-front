'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMyAnswer } from '@/lib/answers';
import AnswerForm from '@/components/answer/AnswerForm';
import AnswerItem from '@/components/answer/AnswerItem';
import React from 'react';
import { MyAnswerResponse } from '@/types/answer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { User } from 'next-auth';

type Props = {
  questionId: number;
};

export default function MyAnswer({ questionId }: Props) {
  const { data: session } = useSession();

  return (
    <>
      <h3 className="text-h3 mb-4 font-semibold">나의 답변</h3>
      {session?.user ? (
        <MyAnswerContent questionId={questionId} user={session.user} />
      ) : (
        <div className="rounded-lg p-6 text-center">
          <p className="mb-4 text-gray-400">
            답변을 달려면 <strong>로그인</strong>이 필요합니다.
          </p>
          <Link
            href={ROUTES.SIGN_IN}
            className="btn-primary inline-block rounded px-4 py-2 text-white"
          >
            로그인하러 가기
          </Link>
        </div>
      )}
      {/*{session?.user && <MyAnswerContent questionId={questionId} user={session.user} />}*/}
    </>
  );
}

function MyAnswerContent({ questionId, user }: { questionId: number; user: User | undefined }) {
  const { data } = useSuspenseQuery<MyAnswerResponse>({
    queryKey: ['answers', 'me', questionId, user?.id],
    queryFn: () => getMyAnswer(questionId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const myAnswer = data?.data?.answer;

  if (myAnswer) {
    return <AnswerItem answer={myAnswer} user={user} />;
  } else {
    return <AnswerForm questionId={questionId} user={user} />;
  }
}
