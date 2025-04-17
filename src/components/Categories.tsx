import { fetchCategories } from '@/api/fetchCategories';
import CategoryItem from '@/components/CategoryItem';

export default async function Categories() {
  const categories = await fetchCategories();
  const allCategories = [{ id: 0, name: 'all' }, ...categories];

  return (
    <nav className="wrapper">
      <ul className="flex gap-3 py-2">
        {allCategories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
