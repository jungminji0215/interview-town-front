import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import AuthMenu from '@/components/AuthMenu';

export default function Navbar() {
  return (
    <header className="shadow-md">
      <nav
        aria-label="사이트 전체 네비게이션"
        className="wrapper flex items-center justify-between"
      >
        <Link href={ROUTES.HOME} aria-label="홈으로 이동">
          <h1 className="font-title text-h1">면접 타운</h1>
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <AuthMenu />
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
