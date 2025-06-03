import UserInfo from '@/components/user/UserInfo';
import MyAnswerQuestions from '@/components/MyAnswerQuestions';

export default function MyPage() {
  return (
    <div className="wrapper space-y-10">
      {/* 프로필 */}
      <UserInfo />
      {/* 내가 작성한 답변 리스트 */}
      <MyAnswerQuestions />
    </div>
  );
}
