import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/answer/AnswerList';
import AnswerForm from '@/components/answer/AnswerForm';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';
import { getQuestion } from '@/api/questions';
import MyAnswerList from '@/components/answer/MyAnswerList';

type PageProps = { params: Promise<{ category: string; id: string }> };

/**
 * generateMetadata: 서버 사이드에서 해당 질문을 가져와 OG 메타 및 SEO 설정
 */
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  const question = await getQuestion(Number(id));

  const canonicalUrl = `https://www.interview-town.com/questions/${question.category}/${question.id}`;

  return {
    title: `${question.title}`,
    description: question.content,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function QuestionPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      <section aria-labelledby="question-title" className="card">
        <QuestionDetail questionId={Number(id)} />
      </section>

      <section aria-labelledby="answer-form-heading" className="card">
        {/*<h2 id="answer-form-heading" className="sr-only">*/}
        {/*  답변 등록*/}
        {/*</h2>*/}
        <AnswerForm questionId={Number(id)} />
      </section>

      {/* 내가 쓴 답변 */}
      <Suspense fallback={<AnswerListSkeleton count={1} />}>
        <MyAnswerList questionId={Number(id)} />
      </Suspense>

      {/* 타인이 쓴 답변 */}
      {/*<Suspense fallback={<AnswerListSkeleton count={5} />}>*/}
      <section aria-labelledby="answers-heading" className="card">
        <h3 id="answers-heading" className="text-h3 mb-4 font-semibold">
          답변
        </h3>
        <AnswerList questionId={Number(id)} />
      </section>
      {/*</Suspense>*/}
    </div>
  );
}
