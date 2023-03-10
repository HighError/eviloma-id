import Iron from '@hapi/iron';
import { NextApiResponse } from 'next';

import { NextApiRequestWithSession } from '../types/NextApiRequest';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './auth-cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? '';

export async function setLoginSession(res: NextApiResponse, session: any) {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequestWithSession) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}
