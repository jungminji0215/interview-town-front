import { Suspense } from 'react';
import QuestionSkeleton from '@/components/skeleton/QuestionListSkeleton';
import QuestionList from '@/components/QuestionList';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;

  return {
    metadataBase: new URL('https://www.interview-town.com'),
    title: `${category} 면접 질문`,
    description: `${category} 면접 질문`,
    // openGraph: {
    //   type: 'article',
    //   title: `${category} 면접 질문`,
    //   description: `${category} 면접 질문`,
    //   url: `https://www.interview-town.com/questions/${category}`,
    //   siteName: '면접 타운',
    //   images: [
    //     {
    //       url: '/open-graph-image.png',
    //       width: 1200,
    //       height: 630,
    //       alt: '면접 타운 썸네일 이미지',
    //     },
    //   ],
    // },
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
