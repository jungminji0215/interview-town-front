'use client';

import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 py-6">
      {pages.map((page) => (
        <Link
          key={page}
          href={`/questions?page=${page}`}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
