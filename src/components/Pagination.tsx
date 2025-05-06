'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {
  currentPage: number;
  totalPages: number;
  visibleCount?: number;
};

export default function Pagination({ currentPage, totalPages, visibleCount = 5 }: Props) {
  const { category } = useParams();

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
    <nav aria-label="페이지 네비게이션">
      <ul className="flex items-center justify-center gap-2 py-4">
        {currentPage > 1 && (
          <li className="rounded-md bg-gray-300 px-3 py-2 text-sm text-black hover:bg-gray-400">
            <Link aria-label="이전 페이지" href={createLink(currentPage - 1)}>
              ◀
            </Link>
          </li>
        )}

        {pages.map((page) => (
          <li
            key={page}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            <Link href={createLink(page)}>{page}</Link>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="rounded-md bg-gray-300 px-3 py-2 text-sm text-black hover:bg-gray-400">
            <Link aria-label="다음 페이지" href={createLink(currentPage + 1)}>
              ▶
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
