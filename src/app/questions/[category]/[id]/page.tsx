// import AnswerForm from '@/components/AnswerForm';
// import Answers from '@/components/Answers';
// import { getAnswers } from '@/services/answers';
// import { questionsAPI } from '@/services/questions';
import React from 'react';
import QuestionDetail from '@/components/QuestionDetail';
import AnswerList from '@/components/AnswerList';

type Props = { params: Promise<{ id: string }> };

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  // const {
  //   data: { question },
  // } = await questionsAPI.getQuestion(Number(slug));
  //
  // const {
  //   data: { answers },
  // } = await getAnswers(Number(slug));

  return (
    <div className="wrapper">
      <QuestionDetail id={Number(id)} />
      {/*/!* 답변 유도 설명글 *!/*/}
      {/*<section*/}
      {/*  aria-labelledby="explanation-heading"*/}
      {/*  className=" flex flex-col items-center text-gray-500 rounded-xl"*/}
      {/*>*/}
      {/*  <h2 id="explanation-heading" className="text-sm font-content">*/}
      {/*    답변을 남기고, 다른 사람들의 답변과 비교하며 보완하세요!*/}
      {/*  </h2>*/}
      {/*</section>*/}
      {/*/!* 내가 답변 남기는 영역 *!/*/}
      {/*<section className="flex items-center">*/}
      {/*  <AnswerForm questionId={question.id} />*/}
      {/*</section>*/}
      {/*/!* 다른 사람들이 남긴 답변 목록 *!/*/}
      {/*<section className="py-5">*/}
      {/*  <Answers answers={answers} questionId={Number(slug)} />*/}
      {/*</section>*/}
      <AnswerList id={Number(id)} />
    </div>
  );
}
