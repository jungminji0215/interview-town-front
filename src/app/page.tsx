import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="mx-auto max-w-6xl p-5">
      <p>여기저기 훝어져 있는 면접 질문 매번 찾기 번거로우셨나요?</p>
      <p>연습은 했는데, 잘 준비하고 있는지 고민된적 있으신가요?</p>
      <p>면접 질문 이제 찾아다니지 마세요!</p>
      <p>면접 타운에서 면접 질문 목록을 확인하고</p>
      <p>면접 준비하는 동료가 어떻게 답변하는지 확인해보세요!</p>
      <Link href="/questions">질문 보러가기</Link>
    </div>
  );
}
