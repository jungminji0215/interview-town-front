import { Category } from '@/types/category';
import { notFound } from 'next/navigation';

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('카테고리 불러오기 실패');
  }

  const {
    data: { categories },
  }: { data: { categories: Category[] } } = await response.json();

  return categories;
};
