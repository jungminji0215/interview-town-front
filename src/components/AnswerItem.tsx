import { AnswerItem as AnswerType } from '@/types/answer';

type Props = {
  answer: AnswerType & {
    isMine: boolean;
    user: { nickname: string };
  };
};
export default function AnswerItem({ answer }: Props) {
  // TODO 내가 쓴 답변 영역 분리
  return (
    <>
      {answer.isMine ? (
        // 본인이 작성한 글
        <li className="rounded-lg border border-gray-300 p-4">
          <p className="text-body whitespace-pre-line">{answer.content}</p>
        </li>
      ) : (
        // 남이 작성한 글
        <li className="rounded-lg border border-gray-300 p-4">
          <p>{answer.user.nickname}</p>
          <p className="text-body whitespace-pre-line">{answer.content}</p>
        </li>
      )}

      {/*<li className="my-2 flex">*/}
      {/*  {answer.isMine ? (*/}
      {/*    // 내 메시지: 오른쪽 정렬*/}
      {/*    <div className="ml-auto max-w-[70%] rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-blue-500 px-4 py-2 break-words text-white">*/}
      {/*      <p className="whitespace-pre-line">{answer.content}</p>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    // 남의 메시지: 왼쪽 정렬 + 닉네임*/}
      {/*    <div className="mr-auto flex max-w-[70%] items-start">*/}
      {/*      <span className="mt-1 mr-2 text-sm font-medium text-gray-600">*/}
      {/*        {answer.user.nickname}*/}
      {/*      </span>*/}
      {/*      <div className="rounded-tl-xl rounded-tr-xl rounded-br-xl bg-gray-200 px-4 py-2 break-words text-gray-800">*/}
      {/*        <p className="whitespace-pre-line">{answer.content}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</li>*/}

      {/*<li className="my-2 flex">*/}
      {/*  {answer.isMine ? (*/}
      {/*    // ── 내가 쓴 메시지 ──*/}
      {/*    <div className="ml-auto flex max-w-[70%] flex-col items-end">*/}
      {/*      /!* 내 닉네임 *!/*/}
      {/*      <span className="mb-1 text-sm font-medium text-blue-300">나</span>*/}
      {/*      <div className="relative rounded-xl bg-blue-500 px-4 py-2 break-words text-white">*/}
      {/*        /!* 말풍선 꼬리 (위쪽) *!/*/}
      {/*        <div className="absolute top-0 right-4 h-0 w-0 -translate-y-full border-x-[8px] border-t-[8px] border-b-[8px] border-x-transparent border-t-transparent border-b-blue-500" />*/}
      {/*        <p className="whitespace-pre-line">{answer.content}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    // ── 남이 쓴 메시지 ──*/}
      {/*    <div className="mr-auto flex max-w-[70%] flex-col items-start">*/}
      {/*      /!* 상대 닉네임 *!/*/}
      {/*      <span className="mb-1 text-sm font-medium text-gray-600">{answer.user.nickname}</span>*/}
      {/*      <div className="relative rounded-xl bg-gray-200 px-4 py-2 break-words text-gray-800">*/}
      {/*        /!* 말풍선 꼬리 (위쪽) *!/*/}
      {/*        <div className="absolute top-0 left-4 h-0 w-0 -translate-y-full border-x-[8px] border-t-[8px] border-b-[8px] border-x-transparent border-t-transparent border-b-gray-200" />*/}
      {/*        <p className="whitespace-pre-line">{answer.content}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</li>*/}
    </>
  );
}
