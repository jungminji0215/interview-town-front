import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { UserCircleIcon } from '@heroicons/react/24/outline';

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
        <ul className="flex items-center gap-4">
          <li>
            <Link href={ROUTES.SIGN_UP}>
              <UserCircleIcon className="h-8 w-8" />
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
