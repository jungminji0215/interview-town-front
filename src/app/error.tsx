'use client';

import { useRouter } from 'next/navigation';

import React, { startTransition, useEffect } from 'react';
import Image from 'next/image';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div className="wrapper mt-20 flex flex-col items-center gap-5">
      <Image
        src="/images/error.png"
        alt="오류 이미지"
        width={400}
        height={400}
        className="rounded-full"
      />
      <p>죄송합니다, 오류가 발생했습니다.</p>
      <button
        className="btn-primary"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
