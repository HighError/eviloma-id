import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';

import { getLoginSession, setLoginSession } from '@/libs/auth';
import authenticate from '@/libs/authenticate';
import corsOptionsDelegate from '@/libs/cors';
import { discordStrategy } from '@/libs/passport-discord';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

passport.use(discordStrategy);

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .use(passport.initialize())
  .get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const oldSession = await getLoginSession(req);
      const user = await authenticate('discord', req, res);

      if (!user) {
        throw new Error('Користувача з таким Discord не знайдено');
      }

      const session = { id: user.id };

      await setLoginSession(res, session);

      if (!oldSession) {
        return res.redirect(308, `/`);
      }
      return res.redirect(308, `/connections?callback_msg=discord`);
    } catch (err) {
      return res.redirect(308, `/login?callback_error=discord`);
    }
  });
