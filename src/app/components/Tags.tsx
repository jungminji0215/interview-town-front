import { Tag } from "@/types/tag";
import React from "react";

interface Props {
  tags: Tag[];
}

export default function Tags({ tags }: Props) {
  return (
    <>
      <h2 id="tags-heading" className="text-gray-500">
        태그
      </h2>
      <ul className="flex gap-3 py-2 text-sm">
        {tags.map((tag) => {
          return (
            <li key={tag.id} className="border border-black rounded-md px-1">
              {tag.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}
