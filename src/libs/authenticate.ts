import { NextApiResponse } from 'next';
import passport from 'passport';

import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

type allowMethods = 'local' | 'discord' | 'google';

const authenticate = (method: allowMethods, req: NextApiRequestWithSession, res: NextApiResponse): Promise<IUser> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: Error | null, user?: IUser) => {
      if (error || !user) {
        reject(error ?? Error());
      } else {
        resolve(user);
      }
    })(req, res);
  });

export default authenticate;
