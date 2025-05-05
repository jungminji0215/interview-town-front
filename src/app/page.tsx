import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  return (
    <div className="wrapper flex flex-col gap-10 p-4">
      <section
        aria-labelledby="intro-heading"
        className="flex flex-col items-center gap-3 lg:flex-row lg:gap-10"
      >
        <Image
          src="/images/main_image_A.png"
          alt="책상 위에 면접 질문지를 보며 고민하는 사람"
          width={500}
          height={500}
          priority={true}
          className="rounded-lg"
        />
        <h2 id="intro-heading" className="text-h2 text-dark-navy">
          면접 질문 매번 찾기 번거롭다면?
        </h2>
      </section>

      <section
        aria-labelledby="feature-heading"
        className="flex flex-col items-center gap-3 lg:flex-row lg:gap-10"
      >
        <Image
          src="/images/main_image_B.png"
          alt="면접 타운 웹사이트를 보며 웃고 있는 사람"
          width={500}
          height={500}
          priority={true}
          className="rounded-lg"
        />
        <div>
          <h2 id="feature-heading" className="text-h2 text-dark-navy mb-1">
            <span className="text-primary">면접 타운</span>에서 질문을 모아보고
            <br />
            동료의 답변을 확인해보세요!
          </h2>

          <Link
            aria-label="면접 질문 목록으로 이동"
            href="/questions"
            className="btn-primary text-h3 mt-4 inline-block"
          >
            면접 타운 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}
