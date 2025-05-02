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
      className={`flex transform cursor-pointer items-center rounded-md px-2 py-1 transition-transform ${
        currentCategory === category.name ? 'bg-primary text-white' : 'bg-gray-200 hover:scale-110'
      }`}
    >
      <Link href={`/questions/${category.name}`}>
        <h2 className="text-h2">{category.name}</h2>
      </Link>
    </li>
  );
}
