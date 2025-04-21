import React from 'react';
import { getQuestion } from '@/api/questions';

type Props = {
  id: number;
};

export default async function QuestionDetail({ id }: Props) {
  const question = await getQuestion(id);

  return (
    <article aria-labelledby="question-title" className="rounded-md bg-white p-4 shadow-sm">
      <h1 id="question-title" className="text-xl font-semibold text-black">
        {question.title}
      </h1>
      <p className="mt-2 text-gray-500">{question.content}</p>
    </article>
  );
}
