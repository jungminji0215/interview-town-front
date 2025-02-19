import Image from "next/image";
import React from "react";

// TODO 예시 데이터 (실제 데이터로 대체)
const answers = [
  {
    id: 1,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 2,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 3,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 4,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 5,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 6,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 7,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 8,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 9,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 10,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 11,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 12,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 13,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 14,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 15,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 16,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
  {
    id: 17,
    text: " 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다. 이것은 다른 사람이 남긴 질문에 대한 답변입니다.",
  },
];

export default function QuestionPage() {
  return (
    <section className="bg-green-200 max-w-5xl mx-auto py-5 px-5 flex flex-col h-full gap-3">
      {/* 질문 내용 */}
      <section
        aria-labelledby="question-heading"
        className="flex gap-5 items-center"
      >
        <Image src={"/interview.png"} width={70} height={70} alt="interview" />
        <div className="bg-yellow-100 py-3 px-5 rounded-xl">
          <h1 id="question-heading" className="text-lg font-bold">
            질문입니다. 어쩌구 저쩌구를 말씀해주세요
          </h1>
          <p>
            이곳에 질문의 본문 내용이 들어갑니다. 이곳에 질문의 본문 내용이
            들어갑니다. 이곳에 질문의 본문 내용이 들어갑니다.
          </p>
        </div>
      </section>

      {/* 답변 유도 설명글 */}
      <section
        aria-labelledby="explanation-heading"
        className="bg-gray-200 flex flex-col items-center py-3 text-gray-600 rounded-xl"
      >
        <h2 id="explanation-heading" className="text-md font-bold">
          실제 면접이라고 생각하고 답변을 남겨보세요.
        </h2>
        <p className="text-sm">
          다른 사람들의 답변과 비교해보면서 답변을 보완해보세요!
        </p>
      </section>

      {/* 다른 사람들이 남긴 답변 목록 */}
      <section className="bg-yellow-300 flex-1 overflow-y-auto p-5 rounded-xl">
        <ul className="flex flex-col gap-5">
          {answers.length > 0 ? (
            answers.map((answer) => (
              <li
                key={answer.id}
                className="border border-black w-4/5 rounded-xl"
              >
                <p>{answer.text}</p>
              </li>
            ))
          ) : (
            <div>답변이 등록되지 않았습니다.</div>
          )}
        </ul>
      </section>

      {/* 내가 답변 남기는 영역 */}
      <section className="flex items-center bg-gray-400 px-5">
        <form className="flex items-center flex-1 gap-3">
          <textarea
            placeholder="여기에 답변을 입력하세요."
            className="border resize-none w-full rounded-xl px-2 py-5"
          />
          <button
            type="submit"
            className="border cursor-pointer rounded-xl py-2"
          >
            답변 등록
          </button>
        </form>
        <Image src={"/answer.svg"} width={80} height={80} alt="interview" />
      </section>
    </section>
  );
}
