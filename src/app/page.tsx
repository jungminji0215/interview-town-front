import { categoriesAPI } from "@/services/categories";
import Categories from "./components/Categories";
import Tags from "./components/Tags";
import Questions from "./components/Questions";

export default async function Home() {
  const { categories } = await categoriesAPI.getCategories();

  return (
    <section className="max-w-5xl mx-auto py-5 px-5">
      <aside className="">
        <section aria-labelledby="categories-heading" className="">
          <Categories data={categories} />
        </section>
        <section aria-labelledby="tags-heading" className=" mt-5">
          <Tags />
        </section>
      </aside>
      <section className="py-5">
        <Questions />
      </section>
    </section>
  );
}
