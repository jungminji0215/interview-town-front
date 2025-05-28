export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  // 주소 잘못, 서버 다운 여기로 안 옴
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  // 로그인 요청
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // TODO 나중에 refresh token 테스트
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
};

export const getSession = async (token: string) => {
  // TODO 임시 -> 쿠키에서 조회하는 것으로 변경
  if (!token) {
    return null;
  }

  /** 토큰 검증 하고 새 토큰 발습 */
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }

  const data = await response.json();

  return data;
};

export const logout = async () => {};
