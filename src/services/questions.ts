export const questionsAPI = {
  // TODO error handling
  async getQuestions(category: string) {
    console.log("========== getQuestions ==========");

    const response = await fetch(
      `http://localhost:8080/questions?category=${category}`,
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
      `http://localhost:8080/questions/${questionId}`,
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
