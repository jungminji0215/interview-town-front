import { getCategories } from '@/api/categories';
import CategoryItem from '@/components/CategoryItem';
import Link from 'next/link';

export default async function CategoryList() {
  const categories = await getCategories();
  const allCategories = [{ id: 0, name: 'all' }, ...categories];

  return (
    <nav aria-label="카테고리 네비게이션" className="py-4">
      <ul className="flex gap-3 overflow-x-auto">
        {/* 스크롤 가능 */}
        {allCategories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
