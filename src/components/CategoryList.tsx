import CategoryItem from '@/components/CategoryItem';
import { Category } from '@/types/category';

type Props = { items: Category[] };

export default async function CategoryList({ items }: Props) {
  return (
    <nav aria-label="카테고리 네비게이션" className="py-4">
      <ul className="flex gap-3 overflow-x-auto py-2">
        {items.map((item) => (
          <CategoryItem key={item.id} category={item} />
        ))}
      </ul>
    </nav>
  );
}
