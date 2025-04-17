import { Tag } from '@/types/tag';
import React from 'react';

type Props = {
  tags: Tag[];
  selected: string;
  onSelect: (tag: string) => void;
};

export default function Tags({ tags, selected, onSelect }: Props) {
  return (
    <>
      <ul className="flex gap-3 py-2">
        {tags.map((tag) => {
          return (
            <li
              onClick={() => onSelect(tag.name)}
              key={tag.id}
              className={`flex cursor-pointer items-center rounded-md px-2 hover:scale-110 ${
                selected === tag.name ? 'bg-blue-700' : 'bg-gray-600'
              }`}
            >
              <p className="font-title text-sm">#{tag.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
