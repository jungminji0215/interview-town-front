import { Question } from '@/types/question';
import Link from 'next/link';

type Props = {
  question: Question;
};

export default function QuestionItem({ question }: Props) {
  return (
    <li className="rounded-md bg-white p-4 hover:bg-gray-100">
      <Link href={`/questions/${question.category.name}/${question.id}`}>
        <h3 className="text-md text-black">{question.title}</h3>
        <p className="text-gray-500">{question.content}</p>
      </Link>
    </li>
  );
}
