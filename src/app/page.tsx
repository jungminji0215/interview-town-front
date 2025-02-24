import { categoriesAPI } from "@/services/categories";

import { tagsAPI } from "@/services/tags";
import HomeClient from "./components/HomeClient";
import { questionsAPI } from "@/services/questions";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : "frontend";
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : "all";

  const {
    data: { categories },
  } = await categoriesAPI.getCategories();

  const {
    data: { tags },
  } = await tagsAPI.getTagsByCategory(category);

  const {
    data: { questions },
  } = await questionsAPI.getQuestions(category);

  return (
    <section className="max-w-5xl mx-auto py-5 px-5">
      <HomeClient
        categories={categories}
        tags={tags}
        initialQuestions={questions}
        currentCategory={category}
        currentTag={tag}
      />
    </section>
  );
}
