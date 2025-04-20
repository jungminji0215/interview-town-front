import Pagination from '@/components/Pagination';
import { fetchQuestions } from '@/api/questions';
import CategoryItems from '@/components/CategoryItems';

type Props = {
  page: number;
  category?: string;
};

export default async function QuestionList({ page, category }: Props) {
  const response = await fetchQuestions(page, category);

  return (
    <>
      <CategoryItems questions={response.questions} />
      <Pagination currentPage={response.currentPage} totalPages={response.totalPages} />
    </>
  );
}
