'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { updateAnswer } from '@/lib/actions/answer-actions';
import { AnswerWithUser } from '@/types/answer';
import Spinner from '@/components/ui/Spinner';

type Props = {
  answer: AnswerWithUser;
  onCancel: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary text-sm">
      {pending ? <Spinner /> : '저장'}
    </button>
  );
}

export default function AnswerEditForm({ answer, onCancel }: Props) {
  const [state, formAction] = useActionState(updateAnswer, undefined);

  // 수정 성공 시, 수정 모드를 종료
  useEffect(() => {
    if (state?.success) {
      onCancel();
    }
  }, [state, onCancel]);

  return (
    <form action={formAction} className="mt-2">
      <input type="hidden" name="answerId" value={answer.id} />
      <input type="hidden" name="questionId" value={answer.questionId} />
      <textarea
        name="content"
        defaultValue={answer.content}
        required
        className="focus:ring-primary w-full resize-none rounded-lg px-4 py-2 focus:ring focus:outline-none"
        rows={3}
      />
      <div className="mt-2 flex items-center justify-end gap-2">
        {state?.error && <p className="text-sm">{state.error}</p>}
        <button type="button" onClick={onCancel} className="text-sm text-gray-600">
          취소
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
