import React, { ReactNode } from 'react';

import CategoryList from '@/components/CategoryList';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="wrapper">
      <CategoryList />
      {children}
    </div>
  );
}
