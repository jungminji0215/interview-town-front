'use client';

import Link from 'next/link';
import { ChatBubbleLeftRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useFetch } from '@/hooks/useFetch';
import { MyAnswer } from '@/types/answer';
import { QUERY_KEYS } from '@/constants/queryKeys';

export default function MyAnswerQuestions() {
  const { user } = useAuth();
  const fetchWrapper = useFetch();

  // TODO 컴포넌트 중간에 이런 로직 불편.. 리팩토링 하기
  if (!user) return null;

  // 내가 답변한 질문 리스트
  const { data: answers } = useSuspenseQuery({
    queryKey: QUERY_KEYS.questions.answeredByMe(user!.id),
    queryFn: async () => {
      const res = await fetchWrapper('/api/me/answers');
      return res.data.answers as MyAnswer[];
    },
    // enabled: !!user?.id, //  user가 없으면 쿼리 실행 스킵 (이거 없으면 유저 정보 없이 요청이 한 번 이루어지므로 401 오류 한 번 발생함)
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return (
    <section className="space-y-6">
      <h2 className="text-h3">내가 작성한 답변 ({answers?.length})</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {answers?.map((answer) => (
          <div key={answer.questionId} className="card">
            {/* 질문 제목 */}
            <Link href={`/questions/${answer.questionId}`} className="line-clamp-1 text-lg">
              {answer.questionTitle}
            </Link>

            {/* 내 답변 레이블 */}
            <div className="bg-primary mt-4 inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-xs">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              <span>나의 답변</span>
            </div>

            {/* 내 답변 내용 */}
            <p className="mt-1 line-clamp-1 flex-1 text-sm whitespace-pre-line">{answer.content}</p>

            {/* 작성일 + 자세히 보기 */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <time>
                {new Date(answer.answeredAt).toLocaleDateString()}
                {new Date(answer.answeredAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
              <Link
                href={`/questions/${answer.categoryName}/${answer.questionId}`}
                className="text-secondary flex items-center gap-1"
              >
                자세히 보기
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
