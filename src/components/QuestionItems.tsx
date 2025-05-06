import { Question } from '@/types/question';
import QuestionItem from '@/components/QuestionItem';

type Props = {
  questions: Question[];
};

export default function QuestionItems({ questions }: Props) {
  return (
    <ul aria-label="질문 리스트" className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </ul>
  );
}
