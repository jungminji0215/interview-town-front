import React, { Suspense } from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/answer/AnswerList';
import AnswerForm from '@/components/answer/AnswerForm';
import AnswerListSkeleton from '@/components/skeleton/AnswerListSkeleton';
import { getQuestion } from '@/lib/api/questions';
import MyAnswerList from '@/components/answer/MyAnswerList';
import { getAnswers, getMyAnswer } from '@/lib/api/answers';
import { getUser } from '@/lib/session';

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

  const questionId = Number(id);

  const [question, myAnswer, initialAnswersData, user] = await Promise.all([
    getQuestion(questionId),
    getMyAnswer(questionId),
    getAnswers(questionId, 1, 10), // 다른 사람 답변의 첫 페이지를 미리 가져옵니다.
    getUser(),
  ]);

  console.log('myAnswer : ', myAnswer);

  return (
    <div className="wrapper flex flex-col gap-5">
      <section aria-labelledby="question-title" className="card">
        <QuestionDetail question={question} />
      </section>

      <section aria-labelledby="answer-form-heading" className="card">
        <AnswerForm questionId={questionId} user={user} />
      </section>

      {/*/!* 내가 쓴 답변 *!/*/}
      {/*<Suspense fallback={<AnswerListSkeleton count={1} />}>*/}
      {/*  <MyAnswerList questionId={Number(id)} />*/}
      {/*</Suspense>*/}

      {/* '나의 답변' 섹션 */}
      <section className="card">
        <h3 className="text-h3 mb-4 font-semibold">나의 답변</h3>
        {myAnswer.length > 0 ? (
          // 나의 답변이 있으면 MyAnswerList에 데이터를 props로 전달하여 렌더링합니다.
          <MyAnswerList initialAnswer={myAnswer} />
        ) : (
          <div className="text-center text-gray-400">
            <p>답변을 등록해보세요. 😆</p>
          </div>
        )}
      </section>

      {/* 타인이 쓴 답변 */}
      <Suspense fallback={<AnswerListSkeleton count={5} />}>
        <section aria-labelledby="answers-heading" className="card">
          <h3 id="answers-heading" className="text-h3 mb-4 font-semibold">
            답변
          </h3>
          <AnswerList questionId={questionId} initialData={initialAnswersData} />
        </section>
      </Suspense>
    </div>
  );
}
