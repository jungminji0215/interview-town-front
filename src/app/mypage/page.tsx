import UserInfo from '@/components/user/UserInfo';
import MyAnswerQuestions from '@/components/MyAnswerQuestions';
import { Suspense } from 'react';
import MyAnswerQuestionsSkeleton from '@/components/skeleton/MyAnswerQuestionsSkeleton';

export default function MyPage() {
  return (
    <div className="wrapper space-y-10">
      {/* 프로필 */}
      <UserInfo />

      {/* 내가 답변한 질문 리스트 */}
      <Suspense fallback={<MyAnswerQuestionsSkeleton />}>
        <MyAnswerQuestions />
      </Suspense>
    </div>
  );
}
