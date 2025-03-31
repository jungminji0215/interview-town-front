"use server";

import { AnswersResponse } from "@/types/answer";
import { revalidatePath } from "next/cache";

// TODO error handling
export const getAnswers = async (
  questionId: number
): Promise<AnswersResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/answers?questionId=${questionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      cache: "no-store",
    }
  );

  const data = await response.json();

  return data;
};

export const addAnswer = async (questionId: number, content: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, content }),
  });

  revalidatePath(`/questions/${questionId}`);
};
