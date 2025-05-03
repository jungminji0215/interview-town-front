import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/AnswerList';
import AnswerForm from '@/components/AnswerForm';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';
import { getQuestion } from '@/api/questions';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const question = await getQuestion(Number(id));

  return {
    title: `면접 타운 | ${question.title}`,
    description: `${question.content}`,
    openGraph: {
      type: 'article',
      title: `면접 타운 | ${question.title}`,
      description: `${question.content}`,
      url: `https://www.interview-town.com/questions/${question.category.name}/${id}`,
      siteName: '면접 타운',
      images: [
        {
          url: '/thumbnail.png',
          width: 1200,
          height: 630,
          alt: question.category.name,
        },
      ],
    },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      <section className="card">
        <QuestionDetail questionId={Number(id)} />
      </section>

      <section className="card">
        <AnswerForm questionId={Number(id)} />
      </section>

      <Suspense fallback={<AnswerListSkeleton count={10} />}>
        <section className="card">
          <AnswerList questionId={Number(id)} />
        </section>
      </Suspense>
    </div>
  );
}
