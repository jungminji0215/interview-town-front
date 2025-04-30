import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex gap-4">
        <Image src="/images/main_image_A.png" alt="main-image" width={500} height={500} />
        <div>
          <p className="text-3xl">여기저기 훝어져 있는 면접 질문 매번 찾기 번거로우셨나요?</p>
          <p className="text-3xl">연습은 했는데, 잘 준비하고 있는지 고민된적 있으신가요?</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <p className="text-3xl">면접 질문 이제 찾아다니지 마세요!</p>
          <p className="text-3xl">
            <span className="text-blue-600">면접 타운</span> 에서 면접 질문을 확인하고
          </p>
          <p className="text-3xl">면접 준비하는 동료가 어떻게 답변하는지 확인해보세요!</p>
          <Link href="/questions">면접 질문 보러가기</Link>
        </div>

        <Image src="/images/main_image_B.png" alt="main-image" width={500} height={500} />
      </div>
    </div>
  );
}
