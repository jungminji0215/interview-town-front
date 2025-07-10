'use client';

import React from 'react';
import AnswerItem from './AnswerItem';

import { AnswerWithUser } from '@/types/answer';
import { QUERY_KEYS } from '@/constants/queryKeys';

type Props = {
  initialAnswer: AnswerWithUser[];
};

export default function MyAnswerList({ initialAnswer }: Props) {
  // 더 이상 로그인 여부나 데이터 로딩 상태를 확인할 필요가 없습니다.
  // 이 컴포넌트가 렌더링되었다는 것 자체가 '나의 답변'이 존재한다는 의미입니다.
  return (
    <ul className="flex flex-col gap-5">
      {initialAnswer.map((answer) => (
        <AnswerItem key={answer.id} answer={answer} />
      ))}
    </ul>
  );
}
