import Iron from '@hapi/iron';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? '';
const TOKEN_NAME = 'token';

export const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getLoginSession(cookie: Record<string, unknown>) {
  const token = cookie[TOKEN_NAME];

  if (!token || typeof token !== 'string') return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}

export async function setLoginSession(res: NextApiResponse, session: Record<string, unknown>) {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  const cookie = serialize(TOKEN_NAME, token, {
    domain: process.env.COOKIE_DOMAIN,
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    domain: process.env.COOKIE_DOMAIN,
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}
