import { Question } from '@/types/question';
import Link from 'next/link';

type Props = {
  question: Question;
};

export default function QuestionItem({ question }: Props) {
  return (
    <li className="card transition hover:shadow-lg">
      <Link href={`/questions/${question.category.name}/${question.id}`}>
        <h3 className="text-h3 text-dark-navy dark:text-light-gray mb-2 font-bold">
          {question.title}
        </h3>
        <p className="text-gray-500">{question.content}</p>
      </Link>
    </li>
  );
}
