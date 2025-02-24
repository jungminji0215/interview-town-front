import { Category } from "@/types/category";
import React from "react";

interface Props {
  categories: Category[];
}

export default function Categories({ categories }: Props) {
  return (
    <>
      <h2 id="categories-heading" className="text-gray-500">
        직무 선택
      </h2>
      <ul className="flex gap-3 py-2 text-2xl">
        {categories.map((category) => {
          return (
            <li
              key={category.id}
              className="border border-black rounded-full px-2"
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
