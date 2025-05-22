import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-gray-500">
      <nav
        aria-label="사이트 전체 네비게이션"
        className="wrapper flex items-center justify-between"
      >
        <Link href={ROUTES.HOME} aria-label="홈으로 이동">
          <h1 className="font-title text-h1">면접 타운</h1>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
