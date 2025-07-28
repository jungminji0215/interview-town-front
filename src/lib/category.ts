export const getCategories = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);

  if (!response.ok) {
    throw new Error('카테고리 불러오기 실패');
  }

  return await response.json();
};
