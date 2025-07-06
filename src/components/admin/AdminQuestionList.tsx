'use client';

import { useState, useRef, FormEvent } from 'react';
import { Question } from '@/types/question';

type Props = {
  initialQuestions: Question[];
};

function AdminQuestionItem({ question }: { question: Question }) {
  const [title, setTitle] = useState(question.title);
  const [content, setContent] = useState(question.content);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const originalTitle = useRef(question.title);
  const originalContent = useRef(question.content);

  const handleEdit = () => {
    originalTitle.current = title;
    originalContent.current = content;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(originalTitle.current);
    setContent(originalContent.current);
    setIsEditing(false);
    setMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${question.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        },
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || 'DB 업데이트에 실패했습니다.');
      }

      const revalidateResponse = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-secret': process.env.NEXT_PUBLIC_REVALIDATE_SECRET!,
        },
        body: JSON.stringify({ tag: 'questions' }),
      });

      if (!revalidateResponse.ok) {
        const errorData = await revalidateResponse.json();
        throw new Error(errorData.message || '캐시 무효화에 실패했습니다.');
      }

      setMessage({ type: 'success', text: '성공적으로 저장되었습니다!' });
      setIsEditing(false);
      originalTitle.current = title;
      originalContent.current = content;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="border-b p-4 last:border-b-0">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor={`title-${question.id}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              id={`title-${question.id}`}
              type="text"
              className="w-full rounded-md border p-2 transition focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor={`content-${question.id}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              내용
            </label>
            <textarea
              id={`content-${question.id}`}
              className="w-full rounded-md border p-2 transition focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md bg-gray-200 px-4 py-1.5 text-sm font-semibold hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-bold">{title}</p>
            <p className="mt-1">{content}</p>
          </div>
          <button
            onClick={handleEdit}
            className="flex-shrink-0 rounded-md bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            수정
          </button>
        </div>
      )}
      {message && (
        <p
          className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
        >
          {message.text}
        </p>
      )}
    </li>
  );
}

export default function AdminQuestionList({ initialQuestions }: Props) {
  return (
    <ul className="divide-y">
      {initialQuestions.map((q) => (
        <AdminQuestionItem key={q.id} question={q} />
      ))}
    </ul>
  );
}
