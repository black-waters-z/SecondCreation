import { jwtDecode } from 'jwt-decode';

export function parseToken(token: string) {
  type TokenPayload = { sub: string; uid: number; exp: number };
  const payload = jwtDecode<TokenPayload>(token);
  return {
    sub: payload.sub,
    uid: payload.uid,
  };
}

export async function getUserInfo(): Promise<{ sub: string; uid: number }> {
  const token = uni.getStorageSync('token');
  return await parseToken(token);
}
