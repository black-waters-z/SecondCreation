import { jwtDecode } from 'jwt-decode';

export function parseToken(token: string) {
  type TokenPayload = { sub: string; uid: number; exp: number };
  const payload = jwtDecode<TokenPayload>(token);
  return {
    sub: payload.sub,
    uid: payload.uid,
  };
}
