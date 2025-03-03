"use client";

import { answersAPI } from "@/services/answers";
import React, { useState } from "react";

export default function AnswerForm({ questionId }: { questionId: number }) {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await answersAPI.addAnswer(questionId, content);
    setContent("");
  };

  return (
    <form
      className="flex flex-col items-center flex-1 gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="여기에 답변을 입력하세요."
        className="resize-none w-full bg-gray-100 rounded-3xl px-4 py-2 text-sm"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="cursor-pointer rounded-2xl bg-secondary font-content px-3 py-2 self-end text-sm"
      >
        답변 등록
      </button>
    </form>
  );
}
