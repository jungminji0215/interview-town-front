export const categoriesAPI = {
  // TODO error handling
  async getCategories() {
    console.log("========== getCategories ==========");

    const response = await fetch("http://localhost:8080/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  },
};
