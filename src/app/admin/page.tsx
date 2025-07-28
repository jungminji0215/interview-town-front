import AdminQuestionList from '@/components/admin/AdminQuestionList';
import { getQuestions } from '@/lib/question';

// 관리자 페이지는 검색 엔진에 노출될 필요가 없으므로 noindex를 추가
export const metadata = {
  title: '콘텐츠 관리',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const { questions } = await getQuestions();

  return (
    <section className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">질문 관리</h1>
      <div className="rounded-lg p-4 shadow-md">
        <AdminQuestionList initialQuestions={questions} />
      </div>
    </section>
  );
}
