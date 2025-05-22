import React from 'react';
import { getQuestion } from '@/api/questions';

type Props = {
  questionId: number;
};

export default async function QuestionDetail({ questionId }: Props) {
  const question = await getQuestion(questionId);

  return (
    <article aria-labelledby="question-title">
      <h2 id="question-title" className="text-h2 mb-4 font-bold">
        {question.title}
      </h2>
      <p className="text-body text-gray-500">{question.content}</p>
    </article>
  );
}
