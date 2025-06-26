export const signup = async ({ email, password }: { email: string; password: string }) => {
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

/**
 * 로그인을 통해 서버가 쿠키(예: refreshToken)를 설정하게 하려면 반드시 클라이언트 측에서 fetch 요청을 보내야 함.
 */
export const signin = async ({ email, password }: { email: string; password: string }) => {
  console.log('email : ', email);
  console.log('password : ', password);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getSession = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/session`, {
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    credentials: 'include', // 참고로 이 옵션은 서버 사이드에서는 작동하지 않는다.
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const refreshAccessToken = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refreshToken`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getMe = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async () => {};
