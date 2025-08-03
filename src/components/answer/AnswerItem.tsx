'use client';

import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from 'next-auth';
import { Answer } from '@/types/answer';
import { updateAnswer } from '@/lib/answers';
import Spinner from '@/components/ui/Spinner';

type Props = {
  answer: Answer;
  user: User | undefined;
};

export default function AnswerItem({ answer, user }: Props) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);

  // 현재 로그인한 사용자가 이 답변의 작성자인지 확인
  const isAuthor = Number(user?.id) === answer.userId;

  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (newContent: string) => updateAnswer(answer.id, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['answers', 'me', answer.questionId, user?.id],
      });

      queryClient.invalidateQueries({ queryKey: ['answers', answer.questionId] });

      setIsEditing(false); // 수정 모드 종료
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onUpdateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editedContent.trim()) return;
    handleUpdate(editedContent);
  };

  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-gray-500">{answer.user.nickname}</span>

        {/* 작성자일 경우에만 수정 버튼  */}
        {isAuthor && !isEditing && (
          <div className="flex gap-2 text-sm">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-800"
            >
              수정
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        // 수정 모드 UI
        <form onSubmit={onUpdateSubmit}>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            rows={4}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isUpdating ? <Spinner /> : '저장'}
            </button>
          </div>
        </form>
      ) : (
        // 일반 보기 모드 UI
        <p className="text-body whitespace-pre-line">{answer.content}</p>
      )}
    </div>
  );
}
