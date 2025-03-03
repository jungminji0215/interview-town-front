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
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return data;
  },
};
