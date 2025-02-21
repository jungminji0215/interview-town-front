export const tagsAPI = {
  // TODO error handling
  async getTagsByCategory(category: string) {
    const response = await fetch(
      `http://localhost:8080/tags?category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const { data } = await response.json();

    return data;
  },
};
