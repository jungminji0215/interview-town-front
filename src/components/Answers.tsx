"use client";

import { RealtimeAnswer } from "@/types/answer";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Props = {
  answers: RealtimeAnswer[];
  questionId: number;
};

export default function Answers({ answers, questionId }: Props) {
  // const [realtimeAnswer, setRealtimeAnswer] = useState(answers);

  // useEffect(() => {
  //   const socket = io(process.env.NEXT_PUBLIC_API_URL);
  //   socket.emit("joinRoom", questionId);
  //   socket.on("newAnswer", (newAnswer) => {
  //     setRealtimeAnswer((prev) => [...prev, newAnswer]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [questionId]);

  return (
    <>
      {answers.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {answers.map((answer) => {
            return (
              <li
                key={answer.id}
                className={"rounded-lg px-4 py-2 text-sm  bg-gray-100"}
              >
                <p className="font-content">{answer.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex justify-center items-center">
          <p className="font-content py-20 text-xl text-center text-gray-400">
            답변이 등록되지 않았습니다. <br />
            제일 먼저 답변하는 면접자가 되어보세요!
          </p>
        </div>
      )}
    </>
  );
}
