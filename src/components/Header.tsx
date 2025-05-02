'use client';

import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="shadow-sm">
      <nav className="wrapper flex items-center justify-between">
        <Link href={ROUTES.HOME}>
          <h1 className="font-title text-h1 text-dark-navy">면접 타운</h1>
        </Link>
        {/*<div className="flex items-center gap-5">*/}
        {/*  <button aria-label="다크 모드 전환" className="cursor-pointer">*/}
        {/*    <Image src={'/dark-mode-moon.svg'} width={30} height={30} alt="다크모드" />*/}
        {/*  </button>*/}
        {/*</div>*/}
      </nav>
    </header>
  );
}
