import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import passport from 'passport';

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
router.get(passport.authenticate('discord'));

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
