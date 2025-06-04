import React, { ReactNode } from 'react';

import CategoryList from '@/components/CategoryList';
import { getCategories } from '@/api/categories';

type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const categories = await getCategories();

  return (
    <div className="wrapper">
      <CategoryList items={[{ id: 0, name: 'all' }, ...categories]} />
      {children}
    </div>
  );
}
