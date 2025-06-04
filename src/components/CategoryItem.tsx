'use client';

import Link from 'next/link';
import { Category } from '@/types/category';
import { useParams } from 'next/navigation';
import React from 'react';

type Props = {
  category: Category;
};

function CategoryItem({ category }: Props) {
  const param = useParams();

  const currentCategory = param.category ?? 'all';
  const isActive = currentCategory === category.name;
  const href = category.name === 'all' ? '/questions' : `/questions/${category.name}`;

  return (
    <li
      className={`flex transform cursor-pointer items-center rounded-md px-2 py-1 transition-transform ${
        isActive ? 'bg-primary text-white' : 'text-dark-navy bg-gray-200 hover:scale-110'
      }`}
    >
      <Link href={href}>
        <h3 className="text-h3">{category.name}</h3>
      </Link>
    </li>
  );
}

export default React.memo(CategoryItem);
