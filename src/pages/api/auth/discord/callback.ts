import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import passport from 'passport';

import { getLoginSession, setLoginSession } from '@/libs/auth';
import authenticate from '@/libs/authenticate';
import corsOptionsDelegate from '@/libs/cors';
import { discordStrategy } from '@/libs/passport-discord';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

passport.use(discordStrategy);

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

router.use(cors(corsOptionsDelegate));
router.use((req, res, next) => {
  passport.initialize();
  next();
});
router.get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const oldSession = await getLoginSession(req);
    const user = await authenticate('discord', req, res).catch(() => null);

    if (!user) {
      return res.redirect(308, `/login?err=ERR_DISCORD_ACCOUNT_NOT_FOUND`);
    }

    const session = { id: user.id };

    await setLoginSession(res, session);

    if (!oldSession) {
      return res.redirect(308, `/?msg=LOGIN_SUCCESS`);
    }
    return res.redirect(308, `/connections?msg=DISCORD_SUCCESS`);
  } catch (err) {
    return res.redirect(308, `/login?err=ERR_SERVER`);
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
