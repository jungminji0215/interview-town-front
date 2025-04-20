import { fetchCategories } from '@/api/categories';
import CategoryItem from '@/components/CategoryItem';

export default async function CategoryList() {
  const categories = await fetchCategories();
  const allCategories = [{ id: 0, name: 'all' }, ...categories];

  return (
    <nav className="py-4">
      <ul className="flex gap-3">
        {allCategories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
