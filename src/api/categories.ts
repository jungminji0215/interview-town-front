import { Category } from '@/types/category';

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    next: { revalidate: 30 }, // TODO 변경 임시로 cache 로 변경하기
  });

  if (!response.ok) {
    throw new Error('카테고리 불러오기 실패');
  }

  const {
    data: { categories },
  }: { data: { categories: Category[] } } = await response.json();

  return categories;
};
