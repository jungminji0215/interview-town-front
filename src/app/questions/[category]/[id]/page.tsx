import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/AnswerList';
import AnswerForm from '@/components/AnswerForm';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';
import ContentCard from '@/components/ContentCard';

type Props = { params: Promise<{ id: string }> };

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      <ContentCard>
        <QuestionDetail questionId={Number(id)} />
      </ContentCard>

      <ContentCard>
        <AnswerForm questionId={Number(id)} />
      </ContentCard>

      <Suspense fallback={<AnswerListSkeleton count={10} />}>
        <ContentCard>
          <AnswerList questionId={Number(id)} />
        </ContentCard>
      </Suspense>
    </div>
  );
}
