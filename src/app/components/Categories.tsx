import { CategoriesProps } from "@/types/category";
import React from "react";

export default function Categories({ categories }: CategoriesProps) {
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
