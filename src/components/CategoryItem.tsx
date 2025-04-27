'use client';

import Link from 'next/link';
import { Category } from '@/types/category';
import { useParams } from 'next/navigation';

type Props = {
  category: Category;
};

export default function CategoryItem({ category }: Props) {
  const param = useParams();

  const currentCategory = param.category ?? 'all';
  return (
    <li
      className={`flex cursor-pointer items-center rounded-md px-2 py-1 hover:scale-110 ${currentCategory === category.name ? 'bg-blue-700' : 'bg-gray-600'}`}
    >
      <Link href={`/questions/${category.name}`}>{category.name}</Link>
    </li>
  );
}
