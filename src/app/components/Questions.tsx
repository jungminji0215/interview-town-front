import { Question } from "@/types/question";
import Link from "next/link";
import React from "react";

interface Props {
  questions: Question[];
}

export default function Questions({ questions }: Props) {
  return (
    <ul className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {questions.map((question) => {
        return (
          <li
            key={question.id}
            className="border rounded-lg py-8 px-3 cursor-pointer hover:scale-105 shadow-md "
          >
            <Link href={`/questions/${question.id}`}>
              <p className="font-content">{question.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
