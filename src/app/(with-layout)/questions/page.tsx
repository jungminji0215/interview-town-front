import { Suspense } from 'react';
import QuestionSkeleton from '@/components/skeleton/QuestionListSkeleton';
import QuestionList from '@/components/QuestionList';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function QuestionPage({ searchParams }: Props) {
  const { page } = await searchParams;

  return (
    <section>
      <Suspense fallback={<QuestionSkeleton count={10} />}>
        <QuestionList page={Number(page) || 1} />
      </Suspense>
    </section>
  );
}
