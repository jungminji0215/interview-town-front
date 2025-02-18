import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-gray-300">
      <nav className="bg-yellow-300 max-w-5xl mx-auto py-5 flex justify-between items-center">
        <Link href={ROUTES.HOME}>면접 타운</Link>
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-3">
            <li className="border border-gray-300 p-1 rounded-xl text-sm">
              <Link href={ROUTES.CONTACT}>이메일 문의</Link>
            </li>
            <li>
              <Link href={ROUTES.LOGIN}>로그인</Link>
            </li>
          </ul>
          <button aria-label="다크 모드 전환">
            <Image
              src={"/dark-mode-moon.svg"}
              width={20}
              height={20}
              alt="다크모드"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
