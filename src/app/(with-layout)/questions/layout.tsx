import React, { ReactNode, Suspense } from 'react';

import Categories from '@/components/Categories';
import CategoriesSkeleton from '@/components/skeleton/CategoriesSkeleton';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      {children}
    </>
  );
}
