import { Question } from "@/types/question";
import Link from "next/link";
import React from "react";

interface Props {
  questions: Question[];
}

export default function Questions({ questions }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-5">
      {questions.map((question) => {
        return (
          <li
            key={question.id}
            className="border border-black rounded-md py-8 px-3"
          >
            <Link href={`/questions/${question.id}`}>{question.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
