'use client';

import UserInfo from '@/components/user/UserInfo';
import MyAnswerQuestions from '@/components/MyAnswerQuestions';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function MyPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 로딩이 끝났고(user가 null) 로그인 상태가 아니라면 로그인 페이지로 이동
    if (!isLoading && !user) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="wrapper space-y-10">
      {/* 프로필 */}
      <UserInfo />
      {/* 내가 작성한 답변 리스트 */}
      <MyAnswerQuestions />
    </div>
  );
}
