import QuestionItemSkeleton from './QuestionItemSkeleton';

export default function QuestionListSkeleton({ count = 10 }) {
  return (
    <ul className="grid animate-pulse grid-cols-1 gap-8 py-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, idx) => (
        <QuestionItemSkeleton key={`question-skeleton-${idx}`} />
      ))}
    </ul>
  );
}
