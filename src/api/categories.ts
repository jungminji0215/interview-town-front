import { Category } from '@/types/category';

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: 'no-cache', // TODO
  });

  if (!response.ok) {
    throw new Error('카테고리 불러오기 실패');
  }

  const {
    data: { categories },
  }: { data: { categories: Category[] } } = await response.json();

  return categories;
};
