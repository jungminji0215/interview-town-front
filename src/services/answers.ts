import { AnswersResponse } from "@/types/answer";

export const answersAPI = {
  // TODO error handling
  async getAnswers(answerId: number): Promise<AnswersResponse> {
    console.log("========== getAnswer by Id==========");

    const response = await fetch(`http://localhost:8080/answers/${answerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    console.log("data :>> ", data);

    return data;
  },
};
