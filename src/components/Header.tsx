import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="shadow-sm">
      <nav
        aria-label="사이트 전체 네비게이션"
        className="wrapper flex items-center justify-between"
      >
        <Link href={ROUTES.HOME} aria-label="홈으로 이동">
          <h1 className="font-title text-h1 text-dark-navy">면접 타운</h1>
        </Link>
        {/*<div className="flex items-center gap-5">*/}
        {/*  <button type="button" aria-label="다크 모드 전환" className="cursor-pointer">*/}
        {/*    <Image src={'/dark-mode-moon.svg'} width={30} height={30}  alt="다크모드 아이콘" />*/}
        {/*  </button>*/}
        {/*</div>*/}
      </nav>
    </header>
  );
}
