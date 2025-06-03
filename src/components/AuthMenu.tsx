'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

export default function AuthMenu() {
  const { user } = useAuth();

  if (!user) {
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

//
