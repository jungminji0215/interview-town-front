import { Suspense } from 'react';
import QuestionSkeleton from '@/components/skeleton/QuestionListSkeleton';
import QuestionList from '@/components/QuestionList';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  const canonicalUrl = 'https://www.interview-town.com/questions/category';

  return {
    title: `${category} 면접 질문`,
    description: `${category} 면접 질문`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CategoryQuestionPage({ params, searchParams }: Props) {
  const { category } = await params;

  // TODO category 있는지 확인해서 없으면 not found
  // if (!section) {
  //   notFound();
  // }

  const { page } = await searchParams;

  return (
    <section aria-labelledby="questions-heading">
      <h2 id="questions-heading" className="sr-only">
        {`${category}`} 질문 목록
      </h2>
      <Suspense fallback={<QuestionSkeleton count={10} />}>
        <QuestionList page={Number(page) || 1} category={category} />
      </Suspense>
    </section>
  );
}
