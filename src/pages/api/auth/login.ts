import { NextApiResponse } from 'next';

import { setLoginSession } from '@/libs/auth-cookies';
import { localAuth } from '@/libs/passport';
import passportMiddleware from '@/middlewares/server/passport';
import reCaptchaMiddleware from '@/middlewares/server/reCaptcha';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      const user = await localAuth(req, res);

      if (!user) {
        return res.status(401).end('ERR_INVALID_LOGIN_OR_PASSWORD');
      }

      const session = { id: user.id };

      await setLoginSession(res, session);

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default passportMiddleware(reCaptchaMiddleware(handler));
