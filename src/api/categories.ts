import { Category } from '@/types/category';
import { notFound } from 'next/navigation';
import { delay } from '@/utils/delay';

export const fetchCategories = async (): Promise<Category[]> => {
  await delay(2000);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    next: { revalidate: 5 }, // TODO 하루로 변경
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
