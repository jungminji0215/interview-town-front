export const categoriesAPI = {
  async getCategories() {
    const response = await fetch("http://localhost:8080/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  },
};
