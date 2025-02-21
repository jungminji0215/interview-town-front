export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoriesProps {
  data: Category[];
}
