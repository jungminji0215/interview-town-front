export const questionsAPI = {
  // TODO error handling
  async getQuestions(category: string) {
    const response = await fetch(
      `http://localhost:8080/questions?category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // TODO SSR 테스트
      }
    );
    const data = await response.json();

    return data;
  },
};
