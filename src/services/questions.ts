export const questionsAPI = {
  async getQuestions(category: string) {
    console.log("========== getQuestions ==========");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questions?category=${category}`,
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

  async getQuestion(questionId: number) {
    console.log("========== getQuestion by Id==========");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`,
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
