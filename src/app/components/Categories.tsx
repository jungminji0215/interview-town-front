import { Category } from "@/types/category";
import React from "react";

interface Props {
  categories: Category[];
  selected: string;
  onSelectCategory: (category: string) => void;
}

export default function Categories({
  categories,
  selected,
  onSelectCategory,
}: Props) {
  return (
    <>
      <h2 id="categories-heading" className="text-gray-400 text-sm">
        직무 선택
      </h2>
      <ul className="flex gap-3 py-2 text-2xl">
        {categories.map((category) => {
          return (
            <li
              onClick={() => onSelectCategory(category.name)}
              key={category.id}
              className={`border-3 border-secondary flex items-center rounded-full px-3 hover:scale-110 cursor-pointer ${
                selected === category.name ? "bg-secondary" : "bg-white"
              }`}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
