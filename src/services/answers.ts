import { AnswersResponse } from "@/types/answer";

export const answersAPI = {
  // TODO error handling
  async getAnswers(questionId: number): Promise<AnswersResponse> {
    console.log("========== getAnswer by questionId==========");

    const response = await fetch(
      `http://localhost:8080/answers?questionId=${questionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

    const data = await response.json();

    return data;
  },

  async addAnswer(questionId: number, content: string, token: string) {
    console.log("========== addAnswer ==========");

    await fetch(`http://localhost:8080/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ questionId, content }),
    });
  },
};
