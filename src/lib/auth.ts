// lib는 외부 함수들 모아두는..

export const signup = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
    method: 'POST',

    // 클라이언트가 서버에게 보내는 데이터의 형식이 JSON이라는 것을 알려주는 역할
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // 주소 잘못, 서버 다운 여기로 안 옴
  if (!response.ok) {
    console.log('서버 꺼졌는데');
    throw new Error(data.message);
  }

  return data;
};
