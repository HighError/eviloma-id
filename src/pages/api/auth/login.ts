import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';

import { IUser } from '@/models/User';

import { setLoginSession } from '../../../libs/auth';
import corsOptionsDelegate from '../../../libs/cors';
import { localStrategy } from '../../../libs/passport-local';
import { NextApiRequestWithSession } from '../../../types/NextApiRequest';

const authenticate = (method: 'local', req: NextApiRequestWithSession, res: NextApiResponse): Promise<IUser> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: Error | null, user?: IUser) => {
      if (error || !user) {
        reject(error ?? Error());
      } else {
        resolve(user);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .use(passport.initialize())
  .post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const user = await authenticate('local', req, res);

      if (!user) {
        throw new Error('Невірний логін або пароль');
      }

      const session = { id: user.id };

      await setLoginSession(res, session);

      return res.status(200).end();
    } catch (err) {
      return res.status(401).end((err as Error).message);
    }
  });
