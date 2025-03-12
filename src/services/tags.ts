export const tagsAPI = {
  // TODO error handling
  async getTagsByCategory(category: string) {
    console.log("========== getTagsByCategory ==========");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tags?category=${category}`,
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
