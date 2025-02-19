import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-green-200 max-w-5xl mx-auto py-5 px-5">
      <aside className="">
        <section aria-labelledby="categories-heading" className="bg-red-200">
          <h2 id="categories-heading" className="text-gray-500">
            직무 선택
          </h2>
          <ul className="flex gap-3 py-2 text-2xl">
            <li className="border border-black rounded-full px-2">
              프론트엔드
            </li>
            <li className="border border-black rounded-full px-2">백엔드</li>
            <li className="border border-black rounded-full px-2">
              안드로이드
            </li>
          </ul>
        </section>

        <section aria-labelledby="tags-heading" className="bg-red-100 mt-5">
          <h2 id="tags-heading" className="text-gray-500">
            태그
          </h2>
          <ul className="flex gap-3 py-2 text-sm">
            <li className="border border-black rounded-md px-1">#react</li>
            <li className="border border-black rounded-md px-1">#javascript</li>
            <li className="border border-black rounded-md px-1">#nextjs</li>
          </ul>
        </section>
      </aside>

      <section className="bg-green-300 py-5">
        <ul className="flex flex-col gap-5">
          <li className="border border-black rounded-md py-8 px-3">
            <Link href="/questions/1">
              이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
              질문입니다.
            </Link>
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.이것은 질문입니다.이것은 질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
          <li className="border border-black rounded-md py-8 px-3">
            이것은 질문입니다.이것은 질문입니다.이것은 질문입니다.이것은
            질문입니다.
          </li>
        </ul>
      </section>
    </section>
  );
}
