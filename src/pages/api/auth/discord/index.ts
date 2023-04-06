import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';

import corsOptionsDelegate from '@/libs/cors';
import { discordStrategy } from '@/libs/passport-discord';

passport.use(discordStrategy);

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .use(passport.initialize())
  .get(passport.authenticate('discord'));
