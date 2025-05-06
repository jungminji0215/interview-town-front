import Pagination from '@/components/Pagination';
import { getQuestions } from '@/api/questions';
import QuestionItems from '@/components/QuestionItems';

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
