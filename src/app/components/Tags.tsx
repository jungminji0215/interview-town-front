import { Tag } from "@/types/tag";
import React from "react";

interface Props {
  tags: Tag[];
  selected: string;
  onSelectTag: (tag: string) => void;
}

export default function Tags({ tags, selected, onSelectTag }: Props) {
  return (
    <>
      <h2 id="tags-heading" className="text-gray-400 text-sm">
        태그
      </h2>
      <ul className="flex gap-3 py-2 text-sm">
        {tags.map((tag) => {
          return (
            <li
              onClick={() => onSelectTag(tag.name)}
              key={tag.id}
              className={`border-3 border-secondary flex items-center rounded-full px-3 hover:scale-110 cursor-pointer ${
                selected === tag.name ? "bg-secondary" : "bg-white"
              }`}
            >
              {tag.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
