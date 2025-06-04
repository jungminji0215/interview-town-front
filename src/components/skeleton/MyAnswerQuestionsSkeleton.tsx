export default function MyAnswerQuestionsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="h-6 w-40 animate-pulse rounded bg-gray-300" />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="card animate-pulse space-y-4 p-6">
            {/* 질문 제목 스켈레톤 */}
            <div className="h-5 w-3/4 rounded bg-gray-300" />

            {/* 레이블 스켈레톤 */}
            <div className="mt-4 h-4 w-16 rounded-full bg-gray-300" />

            {/* 답변 내용 스켈레톤 */}
            <div className="mt-2 h-4 w-full rounded bg-gray-300" />
            <div className="h-4 w-5/6 rounded bg-gray-300" />

            {/* 작성일 + 버튼 스켈레톤 */}
            <div className="mt-4 flex items-center justify-between">
              <div className="h-3 w-1/4 rounded bg-gray-300" />
              <div className="h-4 w-6 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
