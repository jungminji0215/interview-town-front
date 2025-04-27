import { Answer } from '@/types/answer';

type Props = {
  answer: Answer;
};

export default function AnswerItem({ answer }: Props) {
  return (
    <li className="rounded bg-gray-100 p-4">
      <p className="text-sm whitespace-pre-line text-black">{answer.content}</p>
    </li>
  );
}
