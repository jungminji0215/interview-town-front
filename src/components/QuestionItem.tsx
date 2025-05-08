import { Question } from '@/types/question';
import Link from 'next/link';

type Props = {
  question: Question;
};

export default function QuestionItem({ question }: Props) {
  return (
    <li>
      <article className="card transition hover:shadow-lg">
        <Link
          aria-label={`질문 "${question.title}" 상세페이지로 이동`}
          href={`/questions/${question.category.name}/${question.id}`}
        >
          <h3 className="text-body lg:text-h3 text-dark-navy mb-2 line-clamp-1 font-bold">
            {question.title}
          </h3>
          <p className="line-clamp-1 text-gray-500">{question.content}</p>
        </Link>
      </article>
    </li>
  );
}
