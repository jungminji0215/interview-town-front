import UserInfo from '@/components/user/UserInfo';

import { auth } from '@/auth';

export default async function MyPage() {
  const session = await auth();

  return (
    <div className="wrapper space-y-10">
      {/* 프로필 */}
      <UserInfo user={session?.user} />

      {/* 내가 답변한 질문 리스트 */}
      {/*<Suspense fallback={<MyAnswerQuestionsSkeleton />}>*/}
      {/*  <MyAnswerQuestions />*/}
      {/*</Suspense>*/}
    </div>
  );
}
