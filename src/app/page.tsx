import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { ChatBubbleOvalLeftEllipsisIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: '질문 찾기',
    description: '카테고리 별로 면접 질문을 한 번에 모아보세요.',
    href: ROUTES.QUESTIONS,
    icon: ChevronRightIcon,
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: '답변 작성',
    description: '답변을 작성하고, 동료의 답변과 비교해보세요.',
    href: ROUTES.MY_PAGE,
    icon: ChatBubbleOvalLeftEllipsisIcon,
    gradient: 'from-green-500 to-teal-400',
  },
];

export default function HomePage() {
  return (
    <div className="wrapper space-y-16 pt-12">
      <section className="space-y-4 text-center">
        <p>면접 질문을 모아보고, 동료의 실제 답변으로 배우세요.</p>
        <Link href={ROUTES.QUESTIONS} className="btn-primary inline-block px-6 py-3">
          지금 시작하기
        </Link>
      </section>

      <section className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {features.map(({ title, description, href, icon: Icon, gradient }) => (
          <Link
            key={title}
            href={href}
            className="card rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr ${gradient} text-white transition group-hover:scale-110`}
            >
              <Icon className="h-6 w-6" />
            </div>

            <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
            <p className="text-gray-500">{description}</p>

            <div className="mt-6 inline-flex items-center text-indigo-300 transition">
              <span>알아보기</span>
              <ChevronRightIcon className="ml-1 h-5 w-5" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
