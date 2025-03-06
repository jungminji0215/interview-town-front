import { Tag } from "@/types/tag";
import React from "react";

type Props = {
  tags: Tag[];
  selected: string;
  onSelectTag: (tag: string) => void;
};

export default function Tags({ tags, selected, onSelectTag }: Props) {
  return (
    <>
      <h2 id="tags-heading" className="text-gray-400 text-xs">
        태그
      </h2>
      <ul className="flex gap-3 py-2">
        {tags.map((tag) => {
          return (
            <li
              onClick={() => onSelectTag(tag.name)}
              key={tag.id}
              className={`flex items-center rounded-md px-2 hover:scale-110 cursor-pointer ${
                selected === tag.name ? "bg-secondary" : "bg-gray-200"
              }`}
            >
              <p className="text-sm font-title">#{tag.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
