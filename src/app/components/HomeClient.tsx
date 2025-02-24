"use client";

import React from "react";
import Categories from "./Categories";
import Tags from "./Tags";
import Questions from "./Questions";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";
import { Question } from "@/types/question";

interface Props {
  categories: Category[];
  initialTags: Tag[];
  questions: Question[];
}

export default function HomeClient({
  categories,
  initialTags,
  questions,
}: Props) {
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
        <Questions questions={questions} />
      </section>
    </>
  );
}
