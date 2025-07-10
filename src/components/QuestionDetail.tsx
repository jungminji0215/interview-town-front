import React from 'react';
import { getQuestion } from '@/lib/api/questions';
import { Question } from '@/types/question';

type Props = {
  question: Question;
};

export default function QuestionDetail({ question }: Props) {
  return (
    <article aria-labelledby="question-title">
      <h2 id="question-title" className="text-h2 mb-4 font-bold">
        {question.title}
      </h2>
      <p className="text-body text-gray-500">{question.content}</p>
    </article>
  );
}
