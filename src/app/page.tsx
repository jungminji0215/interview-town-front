import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '면접 타운',
  description: '개발자 면접을 함께 연습하는 공간',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: '면접 타운',
    description: '면접 준비가 필요할때, 면접 타운',
    url: 'https://www.interview-town.com',
    siteName: '면접 타운',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'thumbnail image',
      },
    ],
  },
};

export default async function HomePage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 p-4">
      <section className="flex flex-col items-center justify-start gap-10 lg:flex-row">
        <Image
          src="/images/main_image_A.png"
          alt="main-image"
          width={500}
          height={500}
          className="rounded-lg shadow-md"
        />
        <p className="text-h2 text-dark-navy">
          여기저기 흩어져 있는 면접 질문 매번 찾기 번거롭다면
        </p>
      </section>

      <section className="flex flex-col items-center justify-end gap-10 lg:flex-row">
        <div>
          <div className="flex flex-col gap-2">
            <p className="text-h2 text-dark-navy">
              <span className="text-primary">면접 타운</span> 에서 질문을 확인하고
            </p>
            <p className="text-h2 text-dark-navy">
              면접 준비하는 동료가 어떻게 답변하는지 확인해보세요!
            </p>
          </div>
          <Link href="/questions" className="btn-primary text-h2 mt-4 inline-block">
            면접 질문 보러가기
          </Link>
        </div>
        <Image
          src="/images/main_image_B.png"
          alt="main-image"
          width={500}
          height={500}
          className="rounded-lg shadow-md"
        />
      </section>
    </div>
  );
}
