import Pagination from '@/components/Pagination';
import { getQuestions } from '@/api/questions';
import QuestionItems from '@/components/QuestionItems';

type Props = {
  page: number;
  category?: string;
};

export default async function QuestionList({ page, category }: Props) {
  const response = await getQuestions(page, category);

  return (
    <>
      <QuestionItems questions={response.questions} />
      <Pagination currentPage={response.currentPage} totalPages={response.totalPages} />
    </>
  );
}
