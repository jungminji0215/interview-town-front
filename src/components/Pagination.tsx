'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  totalPages: number;
  visibleCount?: number;
};

export default function Pagination({ currentPage, totalPages, visibleCount = 5 }: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const half = Math.floor(visibleCount / 2);
  let startPage = Math.max(currentPage - half, 1);
  let endPage = startPage + visibleCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visibleCount + 1, 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const createLink = (page: number) => `/questions${category ? `/${category}` : ''}?page=${page}`;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {currentPage > 1 && (
        <Link
          href={createLink(currentPage - 1)}
          className="rounded-md bg-gray-300 px-3 py-2 text-sm hover:bg-gray-400"
        >
          ◀ 이전
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createLink(page)}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={createLink(currentPage + 1)}
          className="rounded-md bg-gray-300 px-3 py-2 text-sm hover:bg-gray-400"
        >
          다음 ▶
        </Link>
      )}
    </div>
  );
}
