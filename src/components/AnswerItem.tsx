import { Answer } from '@/types/answer';

type Props = {
  answer: Answer;
};

export default function AnswerItem({ answer }: Props) {
  return (
    <li className="rounded-lg border border-gray-300 p-4">
      <p className="text-sm whitespace-pre-line text-black">{answer.content}</p>
    </li>
  );
}
