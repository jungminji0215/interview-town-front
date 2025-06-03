import { AnswerWithUser } from '@/types/answer';

type Props = {
  answer: AnswerWithUser;
};

export default function AnswerItem({ answer }: Props) {
  return (
    <li className="rounded-lg border border-gray-300 p-4">
      <div className="mb-2">
        <span className="text-gray-500">{answer.user.nickname}</span>
      </div>
      <p className="text-body whitespace-pre-line">{answer.content}</p>
    </li>
  );
}
