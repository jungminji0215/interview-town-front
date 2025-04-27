import React from 'react';
import { getQuestion } from '@/api/questions';

type Props = {
  questionId: number;
};

export default async function QuestionDetail({ questionId }: Props) {
  const question = await getQuestion(questionId);

  return (
    <article aria-labelledby="question-title">
      <h2 id="question-title" className="mb-4 text-xl font-semibold text-black">
        {question.title}
      </h2>
      <p className="text-gray-500">{question.content}</p>
    </article>
  );
}
