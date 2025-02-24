import { categoriesAPI } from "@/services/categories";

import { tagsAPI } from "@/services/tags";
import HomeClient from "./components/HomeClient";
import { questionsAPI } from "@/services/questions";

export default async function Home() {
  const {
    data: { categories },
  } = await categoriesAPI.getCategories();

  const {
    data: { tags },
  } = await tagsAPI.getTagsByCategory("frontend");

  const {
    data: { questions },
    pagination,
  } = await questionsAPI.getQuestions("frontend");

  console.log("questions :>> ", questions);

  return (
    <section className="max-w-5xl mx-auto py-5 px-5">
      <HomeClient
        categories={categories}
        initialTags={tags}
        questions={questions}
      />
    </section>
  );
}
