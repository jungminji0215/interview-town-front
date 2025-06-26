'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth';

export default function AuthMenu() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: getMe, staleTime: Infinity });

  console.log('헤더의 data : ', data);

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
