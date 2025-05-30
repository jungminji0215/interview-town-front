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
    metadataBase: new URL('https://www.interview-town.com'),
    title: `${question.title} | 면접 타운`,
    description: `${question.content}`,
    openGraph: {
      type: 'article',
      title: `${question.title} | 면접 타운`,
      description: `${question.content}`,
      url: `https://www.interview-town.com/questions/${question.category.name}/${id}`,
      siteName: '면접 타운',
      images: [
        {
          url: '/open-graph-image.png',
          width: 1200,
          height: 630,
          alt: '면접 타운 썸네일 이미지',
        },
      ],
    },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      <section aria-labelledby="question-title" className="card">
        <QuestionDetail questionId={Number(id)} />
      </section>

      <section aria-labelledby="answer-form-heading" className="card">
        <h2 id="answer-form-heading" className="sr-only">
          답변 등록
        </h2>
        <AnswerForm questionId={Number(id)} />
      </section>

      <Suspense fallback={<AnswerListSkeleton count={10} />}>
        <section aria-labelledby="answers-heading" className="card">
          <h2 id="answers-heading" className="text-h3 mb-4 font-semibold">
            답변
          </h2>
          <AnswerList questionId={Number(id)} />
        </section>
      </Suspense>
    </div>
  );
}
