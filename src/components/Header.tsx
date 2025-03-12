"use client";

import { ROUTES } from "@/constants/routes";
import { getSession } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  // TODO 임시
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("accessToken");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["session", token],
    queryFn: () => getSession(token!),
    enabled: !!token,
  });

  return (
    <header className="bg-primary">
      <nav className="max-w-5xl mx-auto py-5 px-5 flex justify-between items-center">
        <Link href={ROUTES.HOME}>
          <p className="font-logo text-3xl flex">면접 타운</p>
        </Link>
        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-3">
            {data?.data?.user ? (
              <>
                <li>
                  <span className="font-title text-lg">
                    {data?.data?.user.nickname}
                  </span>
                </li>
                <li>
                  {/* <Link href={ROUTES.LOGIN}> */}
                  <span className="font-title text-lg">로그아웃</span>
                  {/* </Link> */}
                </li>
              </>
            ) : (
              <li>
                <Link href={ROUTES.LOGIN}>
                  <span className="font-title text-lg">로그인</span>
                </Link>
              </li>
            )}
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
