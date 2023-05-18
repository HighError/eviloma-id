import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import passport from 'passport';

import { setLoginSession } from '@/libs/auth';
import corsOptionsDelegate from '@/libs/cors';
import { localStrategy } from '@/libs/passport-local';
import verifyReCaptcha from '@/libs/re-captcha';
import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

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

router.use(cors(corsOptionsDelegate));
router.use((req, res, next) => {
  passport.initialize();
  next();
});
router.post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const { captcha } = req.body;
    const verifyCaptcha = await verifyReCaptcha(captcha ?? '');

    if (!verifyCaptcha.data.success) {
      throw new Error('ERR_INVALID_CAPTCHA');
    }

    const user = await authenticate('local', req, res);

    if (!user) {
      throw new Error('ERR_INVALID_LOGIN_OR_PASSWORD');
    }

    const session = { id: user.id };

    await setLoginSession(res, session);

    return res.status(200).end();
  } catch (err) {
    return res.status(401).end((err as Error).message);
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
