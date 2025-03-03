import AnswerForm from "@/app/components/AnswerForm";
import Answers from "@/app/components/Answers";
import { answersAPI } from "@/services/answers";
import { questionsAPI } from "@/services/questions";
import React from "react";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const {
    data: { question },
  } = await questionsAPI.getQuestion(Number(slug));

  const {
    data: { answers },
  } = await answersAPI.getAnswers(Number(slug));

  return (
    <section className="max-w-5xl mx-auto py-5 px-5 flex flex-col h-full gap-3">
      <section
        aria-labelledby="question-heading"
        className="flex gap-5 items-center"
      >
        {/* <Image src={"/interview.png"} width={70} height={70} alt="interview" /> */}
        <div className="bg-secondary py-3 px-5 rounded-xl w-full">
          <h1 id="question-heading" className="sr-only">
            면접 질문
          </h1>
          <p className="font-content w-full">{question.title}</p>
        </div>
      </section>

      {/* 답변 유도 설명글 */}
      <section
        aria-labelledby="explanation-heading"
        className=" flex flex-col items-center text-gray-500 rounded-xl"
      >
        <h2 id="explanation-heading" className="text-sm font-content">
          답변을 남기고, 다른 사람들의 답변과 비교하며 보완하세요!
        </h2>
      </section>

      {/* 다른 사람들이 남긴 답변 목록 */}
      <section className="border border-gray-200 flex-1 overflow-y-auto p-5 rounded-xl">
        <Answers answers={answers} />
      </section>

      {/* 내가 답변 남기는 영역 */}
      <section className="flex items-center">
        <AnswerForm questionId={question.id} />
        {/* <Image src={"/answer.svg"} width={80} height={80} alt="interview" /> */}
      </section>
    </section>
  );
}
