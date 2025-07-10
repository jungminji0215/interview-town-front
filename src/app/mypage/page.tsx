import UserInfo from '@/components/user/UserInfo';
import MyAnswerQuestions from '@/components/MyAnswerQuestions';
import { Suspense } from 'react';
import MyAnswerQuestionsSkeleton from '@/components/skeleton/MyAnswerQuestionsSkeleton';
import { getUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default async function MyPage() {
  const user = await getUser();

  // 서버에서 세션을 확인하고, 없으면 로그인 페이지로 리다이렉트합니다.
  // 미들웨어에서도 처리하지만, 페이지 레벨에서 한 번 더 확인하는 것이 더 안전합니다.
  if (!user) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div className="wrapper space-y-10">
      {/* 프로필 */}
      <UserInfo user={user} />

      {/* 내가 답변한 질문 리스트 */}
      {/*<Suspense fallback={<MyAnswerQuestionsSkeleton />}>*/}
      {/*  <MyAnswerQuestions />*/}
      {/*</Suspense>*/}
    </div>
  );
}
