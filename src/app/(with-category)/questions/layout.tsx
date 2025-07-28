import React, { ReactNode } from 'react';

import CategoryList from '@/components/CategoryList';
import { getCategories } from '@/lib/category';

type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const { data } = await getCategories();

  return (
    <div className="wrapper">
      <CategoryList items={[{ id: 0, name: 'all' }, ...data.categories]} />
      {children}
    </div>
  );
}
