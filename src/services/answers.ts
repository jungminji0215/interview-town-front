import { AnswersResponse } from "@/types/answer";

export const answersAPI = {
  // TODO error handling
  async getAnswers(questionId: number): Promise<AnswersResponse> {
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
  },

  async addAnswer(questionId: number, content: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId, content }),
    });
  },
};
