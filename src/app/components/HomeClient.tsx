import React from "react";
import Categories from "./Categories";
import Tags from "./Tags";
import Questions from "./Questions";

export default function HomeClient({
  categories,
  initialTags,
  initialQuestions,
}) {
  return (
    <>
      <aside>
        <section aria-labelledby="categories-heading" className="">
          <Categories categories={categories} />
        </section>
        <section aria-labelledby="tags-heading" className=" mt-5">
          <Tags tags={[{ id: 0, name: "all" }, ...initialTags]} />
        </section>
      </aside>
      <section className="py-5">
        <Questions initialQuestions={initialQuestions} />
      </section>
    </>
  );
}
