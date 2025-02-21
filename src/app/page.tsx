import { categoriesAPI } from "@/services/categories";

import { tagsAPI } from "@/services/tags";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  const { categories } = await categoriesAPI.getCategories();

  const { tags } = await tagsAPI.getTagsByCategory("frontend");
  console.log("tags :>> ", tags);
  // const { questions } = await questionsAPI.getQuestions("frontend"); // 프론트엔드 기본 질문

  return (
    <section className="max-w-5xl mx-auto py-5 px-5">
      <HomeClient
        categories={categories}
        initialTags={tags}
        // initialQuestions={questions}
      />
    </section>
  );
}
