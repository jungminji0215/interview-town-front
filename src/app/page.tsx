import { categoriesAPI } from "@/services/categories";

import { tagsAPI } from "@/services/tags";
import HomeClient from "./components/HomeClient";
import { questionsAPI } from "@/services/questions";

export default async function Home() {
  const { categories } = await categoriesAPI.getCategories();
  const { tags } = await tagsAPI.getTagsByCategory("frontend");
  const data = await questionsAPI.getQuestions("frontend");

  return (
    <section className="max-w-5xl mx-auto py-5 px-5">
      <HomeClient
        categories={categories}
        initialTags={tags}
        initialQuestions={data}
      />
    </section>
  );
}
