"use client";

import { answersAPI } from "@/services/answers";
import { getSession } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function AnswerForm({ questionId }: { questionId: number }) {
  const [content, setContent] = useState<string>("");

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("accessToken");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["session", token],
    queryFn: () => getSession(token!),
    enabled: !!token,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await answersAPI.addAnswer(questionId, content, token!);
    setContent("");
  };

  return (
    <form className="relative flex-1" onSubmit={handleSubmit}>
      <textarea
        placeholder="여기에 답변을 입력하세요."
        className="resize-none w-full bg-gray-100 rounded-3xl px-4 py-2 text-sm pr-16"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 bottom-4 cursor-pointer rounded-3xl bg-secondary font-content px-3 py-2 self-end text-sm"
      >
        등록
      </button>
    </form>
  );
}
