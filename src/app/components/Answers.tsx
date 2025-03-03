"use client";

import { Answer } from "@/types/answer";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Props = {
  answers: Answer[];
};

export default function Answers({ answers }: Props) {
  const [realtimeAnswer, setRealtimeAnswer] = useState(answers);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("newAnswer", (newAnswer) => {
      setRealtimeAnswer((prev) => [...prev, newAnswer]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {realtimeAnswer.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {realtimeAnswer.map((answer) => (
            <li
              key={answer.id}
              className="bg-gray-100 rounded-3xl px-4 py-2 text-sm w-fit"
            >
              <p className="font-content">{answer.content}</p>
            </li>
          ))}
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
