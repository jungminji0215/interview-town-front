'use client';

import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-dark-navy border-b border-gray-600">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href={ROUTES.HOME}>
          <p className="font-logo flex items-center text-3xl text-white">면접 타운</p>
        </Link>
        <div className="flex items-center gap-5">
          <button aria-label="다크 모드 전환">
            <Image src={'/dark-mode-moon.svg'} width={20} height={20} alt="다크모드" />
          </button>
        </div>
      </nav>
    </header>
  );
}
