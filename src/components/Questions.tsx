import { Question } from '@/types/question';
import Link from 'next/link';
import React from 'react';

type Props = {
  questions: Question[];
};

export default function Questions({ questions }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {questions.map((question) => {
        return (
          <li
            key={question.id}
            className="cursor-pointer rounded-lg border px-3 py-8 shadow-md hover:scale-105"
          >
            <Link href={`/src/app/questions/${question.id}`}>
              <p className="font-content">{question.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
