export const isExpired = (token: string) => {
  try {
    const [, pl] = token.split('.');
    const { exp } = JSON.parse(Buffer.from(pl, 'base64').toString());
    return exp <= Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
};

export default function isValidToken({
  accesstoken,
  refreshtoken,
}: {
  accesstoken?: string;
  refreshtoken?: string;
}): {
  isAccessTokenValid: boolean;
  isRefreshTokenValid: boolean;
} {
  console.log('토큰 검사한다');
  console.log('accesstoken : ', accesstoken);
  console.log('refreshtoken : ', refreshtoken);
  const now = Math.floor(Date.now() / 1000);
  let isAccessTokenValid = false;
  let isRefreshTokenValid = false;

  try {
    if (accesstoken) {
      const [, payloadB64] = accesstoken.split('.');
      const { exp } = JSON.parse(atob(payloadB64)) as { exp?: number };
      isAccessTokenValid = Boolean(exp && exp > now);
    }
    if (refreshtoken) {
      const [, payloadB64] = refreshtoken.split('.');
      const { exp } = JSON.parse(atob(payloadB64)) as { exp?: number };
      isRefreshTokenValid = Boolean(exp && exp > now);
    }
  } catch (err) {
    console.error('토큰 디코딩 실패:', err);
  }

  return { isAccessTokenValid, isRefreshTokenValid };
}
