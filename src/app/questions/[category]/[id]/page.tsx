import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/answer/AnswerList';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';
import { getQuestion } from '@/lib/question';

import MyAnswer from '@/components/answer/MyAnswer';

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
  // 게시글 ID
  const { id } = await params;

  return (
    <div className="wrapper flex flex-col gap-5">
      {/* 질문 상세 */}
      <section className="card">
        <QuestionDetail questionId={Number(id)} />
      </section>

      <section className="card">
        <Suspense fallback={<AnswerListSkeleton count={1} />}>
          <MyAnswer questionId={Number(id)} />
        </Suspense>
      </section>

      {/* 타인이 쓴 답변 */}
      <Suspense fallback={<AnswerListSkeleton count={5} />}>
        <section className="card">
          <h3 className="text-h3 mb-4 font-semibold">답변</h3>
          <AnswerList questionId={Number(id)} />
        </section>
      </Suspense>
    </div>
  );
}
