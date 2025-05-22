import { getCategories } from '@/api/categories';
import CategoryItem from '@/components/CategoryItem';

export default async function CategoryList() {
  const categories = await getCategories();

  return (
    <nav aria-label="카테고리 네비게이션" className="py-4">
      <ul className="flex gap-3 overflow-x-auto py-2">
        <CategoryItem key={0} category={{ id: 0, name: 'all' }} />
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
