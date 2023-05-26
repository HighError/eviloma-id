import { NextApiResponse } from 'next';

import { getLoginSession, setLoginSession } from '@/libs/authCookies';
import authenticate from '@/libs/authenticate';
import passportMiddleware from '@/middlewares/server/passport';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'GET') {
    try {
      const oldSession = await getLoginSession(req.cookies || req.headers.cookie || []);
      const user = await authenticate('google', req, res).catch(() => null);

      if (!user) {
        return res.redirect(308, `/login?err=ERR_GOOGLE_ACCOUNT_NOT_FOUND`);
      }

      const session = { id: user.id };

      await setLoginSession(res, session);

      if (!oldSession) {
        return res.redirect(308, `/?msg=LOGIN_SUCCESS`);
      }
      return res.redirect(308, `/connections?msg=GOOGLE_SUCCESS`);
    } catch (err) {
      return res.redirect(308, `/login?err=ERR_SERVER`);
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default passportMiddleware(handler);
