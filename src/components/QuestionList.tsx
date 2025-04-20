import Pagination from '@/components/Pagination';
import { fetchAllQuestions } from '@/api/questions';
import CategoryItems from '@/components/CategoryItems';

type Props = {
  page: number;
};

export default async function QuestionList({ page }: Props) {
  const response = await fetchAllQuestions(page);

  return (
    <>
      <CategoryItems questions={response.questions} />
      <Pagination currentPage={response.currentPage} totalPages={response.totalPages} />
    </>
  );
}
