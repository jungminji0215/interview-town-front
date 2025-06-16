import { Suspense } from 'react';
import QuestionSkeleton from '@/components/skeleton/QuestionListSkeleton';
import QuestionList from '@/components/QuestionList';
import type { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export const metadata: Metadata = {
  title: '개발자 면접 질문',
  description: '개발자 면접 질문 모아보기',
  alternates: {
    canonical: 'https://www.interview-town.com/questions',
  },
};

export default async function QuestionPage({ searchParams }: Props) {
  // 이렇게 실시간으로 page 기반으로 서버로부터 불러와서 렌더링해줘야하는 페이지는
  // static 페이지로 설정할 수 없어서 풀 라우트 캐시는 불가능함
  // 하지만 데이터 캐시는 가능 (해당 데이터 요청 결과를 데이터 캐시)
  // (동적인 값에 의존하는 페이지임)
  const { page = '1' } = await searchParams;
  const pageNum = Number(page);

  return (
    <section aria-labelledby="questions-heading">
      <h2 id="questions-heading" className="sr-only">
        질문 목록
      </h2>
      <Suspense fallback={<QuestionSkeleton count={10} />}>
        <QuestionList page={pageNum} />
      </Suspense>
    </section>
  );
}
