import { Suspense } from 'react';
import QuestionSkeleton from '@/components/skeleton/QuestionsSkeleton';
import QuestionList from '@/components/QuestionList';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CategoryQuestionPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;

  return (
    <section>
      <Suspense fallback={<QuestionSkeleton count={10} />}>
        <QuestionList page={Number(page) || 1} category={category} />
      </Suspense>
    </section>
  );
}
