"use client";

import React, { useEffect, useMemo, useState } from "react";
import Categories from "./Categories";
import Tags from "./Tags";
import Questions from "./Questions";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";
import { Question } from "@/types/question";
import { useRouter } from "next/navigation";

interface Props {
  categories: Category[];
  tags: Tag[];
  initialQuestions: Question[];
  currentCategory: string;
  currentTag: string;
}

export default function HomeClient({
  categories,
  tags,
  initialQuestions,
  currentCategory,
  currentTag,
}: Props) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);

  // 카테고리는 SSR로 관리되므로 URL 변경을 통해 페이지 리렌더링
  const [selected, setSelected] = useState({
    category: currentCategory,
    tag: currentTag,
  });

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  const onSelectCategory = async (category: string) => {
    router.push(`/?category=${category}`);
  };

  useEffect(() => {
    setSelected({
      category: currentCategory,
      tag: currentTag,
    });
  }, [currentCategory, currentTag]);

  const onSelectTag = (tag: string) => {
    setSelected((prev) => ({ ...prev, tag: tag }));
  };

  const filteredQuestions = useMemo(() => {
    if (selected.tag === "all") {
      return questions;
    }
    return questions.filter((q) => q.tag && q.tag.name === selected.tag);
  }, [questions, selected.tag]);

  return (
    <>
      <aside>
        <section aria-labelledby="categories-heading" className="">
          <Categories
            categories={categories}
            selected={selected.category}
            onSelectCategory={onSelectCategory}
          />
        </section>
        <section aria-labelledby="tags-heading" className=" mt-5">
          <Tags
            tags={[{ id: 0, name: "all" }, ...tags]}
            selected={selected.tag}
            onSelectTag={onSelectTag}
          />
        </section>
      </aside>
      <section className="py-5">
        <Questions questions={filteredQuestions} />
      </section>
    </>
  );
}
