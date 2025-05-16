import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrapper mt-20 flex flex-col items-center gap-5">
      <Image
        src="/images/not-found.png"
        alt="404 이미지"
        width={400}
        height={400}
        className="rounded-full"
      />

      <div className="flex flex-col gap-2">
        <p className="text-h3">면접 준비 중인데 엉뚱한 곳에 도착하셨어요.</p>
        <div className="flex flex-col items-center justify-center">
          <p>존재하지 않는 페이지를 요청하셨거나,</p>
          <p>주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        </div>
      </div>

      <Link href="/">
        <button className="btn-primary">홈으로</button>
      </Link>
    </div>
  );
}
