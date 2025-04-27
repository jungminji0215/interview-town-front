import QuestionItemSkeleton from './QuestionItemSkeleton';

export default function AnswerListSkeleton({ count = 10 }) {
  return (
    <ul className="grid animate-pulse gap-5 py-2">
      {Array.from({ length: count }).map((_, idx) => (
        <QuestionItemSkeleton key={`question-skeleton-${idx}`} />
      ))}
    </ul>
  );
}
