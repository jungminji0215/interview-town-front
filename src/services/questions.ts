export const questionsAPI = {
  async getQuestions(category: string) {
    console.log("========== getQuestions ==========");

    // TODO 시간 지연 테스트를 위함
    await new Promise((resolve) => setTimeout(resolve, 3000));

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
