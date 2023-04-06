import { parse, serialize } from 'cookie';
import { NextApiResponse } from 'next';

import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const TOKEN_NAME = 'token';

export const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setTokenCookie(res: NextApiResponse, token: string) {
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

export function parseCookies(req: NextApiRequestWithSession) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getTokenCookie(req: NextApiRequestWithSession) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}
