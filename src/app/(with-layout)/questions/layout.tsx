import React, { ReactNode } from 'react';

import CategoryList from '@/components/CategoryList';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="wrapper">
      <CategoryList />
      {children}
    </div>
  );
}
