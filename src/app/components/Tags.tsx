import React from "react";

export default function Tags({ tags }) {
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
