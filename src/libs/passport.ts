import { NextApiResponse } from 'next';
import passport from 'passport';

import discordStrategy from '@/libs/passport/discord';
import googleStrategy from '@/libs/passport/google';
import localStrategy from '@/libs/passport/local';
import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

passport.use(localStrategy);
passport.use(discordStrategy);
passport.use(googleStrategy);

export const localAuth = (req: NextApiRequestWithSession, res: NextApiResponse): Promise<IUser> =>
  new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (error: Error | null, user?: IUser) => {
      if (error || !user) {
        reject(error ?? Error());
      } else {
        resolve(user);
      }
    })(req, res);
  });

export default passport;
