import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/AnswerList';
import AnswerForm from '@/components/AnswerForm';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';

type Props = { params: Promise<{ id: string }> };

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      <QuestionDetail questionId={Number(id)} />
      <AnswerForm questionId={Number(id)} />
      <Suspense fallback={<AnswerListSkeleton count={10} />}>
        <AnswerList questionId={Number(id)} />
      </Suspense>
    </div>
  );
}
