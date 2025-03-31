"use client";

import { addAnswer } from "@/services/answers";
import React, { useState } from "react";

export default function AnswerForm({ questionId }: { questionId: number }) {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAnswer(questionId, content);
    setContent("");
  };

  return (
    <form className="relative flex-1" onSubmit={handleSubmit}>
      <textarea
        placeholder="여기에 답변을 입력하세요."
        className="resize-none w-full bg-gray-100 rounded-lg px-4 py-2 text-sm pr-16"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 bottom-4 cursor-pointer rounded-lg bg-secondary font-content px-3 py-2 self-end text-sm"
      >
        등록
      </button>
    </form>
  );
}
