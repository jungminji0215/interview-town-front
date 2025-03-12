"use client";

import { getSession } from "@/services/auth";
import { RealtimeAnswer } from "@/types/answer";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Props = {
  answers: RealtimeAnswer[];
  questionId: number;
};

export default function Answers({ answers, questionId }: Props) {
  const [realtimeAnswer, setRealtimeAnswer] = useState(answers);

  console.log("realtimeAnswer :>> ", realtimeAnswer);

  // TODO 임시
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("accessToken");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["session", token],
    queryFn: () => getSession(token!),
    enabled: !!token,
  });

  console.log("data :>> ", data?.data?.user);

  useEffect(() => {
    const socket = io("http://localhost:80");

    // 클라이언트가 특정 질문의 룸에 참여하도록 요청
    socket.emit("joinRoom", questionId);

    // "newAnswer" 이벤트를 수신하면 상태 업데이트
    socket.on("newAnswer", (newAnswer) => {
      setRealtimeAnswer((prev) => [...prev, newAnswer]);
    });

    return () => {
      socket.disconnect();
    };
  }, [questionId]);

  return (
    <>
      {realtimeAnswer.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {realtimeAnswer.map((answer) => {
            const isCurrentUser = data?.data?.user?.id === answer.user_id;

            return (
              <li
                key={answer.id}
                className={`rounded-3xl px-4 py-2 text-sm w-fit ${
                  isCurrentUser
                    ? "self-end bg-gray-300"
                    : "self-start bg-gray-100"
                }`}
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
