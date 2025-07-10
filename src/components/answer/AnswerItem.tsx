import { AnswerWithUser } from '@/types/answer';
import { useActionState, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AnswerEditForm from '@/components/answer/AnswerEditForm';
import { deleteAnswer } from '@/lib/actions/answer-actions';

type Props = {
  answer: AnswerWithUser;
};

export default function AnswerItem({ answer }: Props) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [deleteState, deleteFormAction] = useActionState(deleteAnswer, undefined);

  // 현재 로그인한 사용자가 답변의 작성자인지 확인
  const isAuthor = user?.id === answer.user.id;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="rounded-lg border border-gray-300 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-gray-500">{answer.user.nickname}</span>

        {isAuthor && !isEditing && (
          <div className="flex space-x-2 text-sm">
            {/*<button onClick={handleEditClick} className="cursor-pointer text-gray-500">*/}
            {/*  수정*/}
            {/*</button>*/}

            <form action={deleteFormAction}>
              <input type="hidden" name="answerId" value={answer.id} />
              <input type="hidden" name="questionId" value={answer.questionId} />
              <button type="submit" className="text-primary cursor-pointer">
                삭제
              </button>
            </form>
          </div>
        )}
      </div>

      {/*{isEditing ? (*/}
      {/*  <AnswerEditForm answer={answer} onCancel={handleCancelEdit} />*/}
      {/*) : (*/}
      <p className="text-body whitespace-pre-line">{answer.content}</p>
      {/*)}*/}
    </li>
  );
}
