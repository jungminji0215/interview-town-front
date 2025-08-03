'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function AuthMenu() {
  const { data } = useSession();

  if (!data?.user) {
    return (
      <Link href={ROUTES.SIGN_IN}>
        <p>로그인</p>
      </Link>
    );
  }

  return (
    <Link href={ROUTES.MY_PAGE}>
      <UserCircleIcon className="h-8 w-8" />
    </Link>
  );
}
