import Pagination from '@/components/Pagination';
import QuestionItems from '@/components/QuestionItems';
import { getQuestions } from '@/lib/question';

type Props = {
  page: number;
  category?: string;
};

export default async function QuestionList({ page, category }: Props) {
  const { questions, currentPage, totalPages } = await getQuestions(page, category);
  return (
    <>
      <QuestionItems questions={questions} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
