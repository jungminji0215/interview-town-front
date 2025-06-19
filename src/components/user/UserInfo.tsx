'use client';

import { useAuth } from '@/context/AuthContext';
import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <section className="relative flex items-center space-x-4">
      <UserCircleIcon className="h-16 w-16" />

      <div>
        <div className="flex items-center space-x-2">
          <p className="text-h2 font-bold">{user?.nickname}</p>
          <PencilIcon
            className="hover:text-primary h-5 w-5 cursor-pointer"
            onClick={() => alert('닉네임 수정 기능은 현재 준비중인 기능입니다. ')}
          />
        </div>
        <p className="text-gray-400">{user?.email}</p>
      </div>

      <div className="absolute top-0 right-0">
        <button className="hover:text-secondary cursor-pointer text-sm text-gray-400">
          로그아웃
        </button>
      </div>
    </section>
  );
}
