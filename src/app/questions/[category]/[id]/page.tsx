// import AnswerForm from '@/components/AnswerForm';
// import Answers from '@/components/Answers';
// import { getAnswers } from '@/services/answers';
// import { questionsAPI } from '@/services/questions';
import React from 'react';

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  // const slug = (await params).slug;

  // const {
  //   data: { question },
  // } = await questionsAPI.getQuestion(Number(slug));
  //
  // const {
  //   data: { answers },
  // } = await getAnswers(Number(slug));

  return (
    <section className="mx-auto flex h-full max-w-5xl flex-col gap-3 px-5 py-5">
      {/*<section*/}
      {/*  aria-labelledby="question-heading"*/}
      {/*  className="flex gap-5 items-center"*/}
      {/*>*/}
      {/*  /!* <Image src={"/interview.png"} width={70} height={70} alt="interview" /> *!/*/}
      {/*  <div className="bg-secondary py-3 px-5 rounded-lg w-full">*/}
      {/*    <h1 id="question-heading" className="sr-only">*/}
      {/*      면접 질문*/}
      {/*    </h1>*/}
      {/*    <p className="font-content w-full">{question.title}</p>*/}
      {/*  </div>*/}
      {/*</section>*/}
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
      상세 페이지
    </section>
  );
}
