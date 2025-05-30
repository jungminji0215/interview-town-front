import { useAuth } from '@/context/AuthContext';
import { refreshAccessToken } from '@/api/auth';

// TODO post, get ... 나누기
export function useFetch() {
  const { token, setToken } = useAuth();

  return async function fetchWrapper(url: string, init: RequestInit = {}): Promise<any> {
    const headers = new Headers(init.headers || {});

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');

    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...init,
      headers,
      credentials: 'include',
    });

    // 401 뜨면 refresh 토큰으로 재발급 + 재시도
    if (res.status === 401 && token) {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refreshToken`, {
        method: 'GET',
        credentials: 'include',
      });

      // refreshToken 이 만료됐을 경우
      if (!r.ok) throw new Error('세션 만료, 재로그인 필요');

      const { accessToken: newToken } = await refreshAccessToken();
      setToken(newToken);

      // 실패한 요청 재시도
      headers.set('Authorization', `Bearer ${newToken}`);

      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...init,
        headers,
        credentials: 'include',
      });
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || `API 오류 ${res.status}`;
      throw new Error(message);
    }

    return res.json();
  };
}
