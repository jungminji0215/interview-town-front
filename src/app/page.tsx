import { categoriesAPI } from "@/services/categories";

import { tagsAPI } from "@/services/tags";
import HomeClient from "../components/HomeClient";
import { questionsAPI } from "@/services/questions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category ?? "frontend";

  const tag = Array.isArray(searchParams.tag)
    ? searchParams.tag[0]
    : searchParams.tag ?? "all";

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
