import bcrypt from 'bcryptjs';
import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { setLoginSession } from '@/libs/auth';
import corsOptionsDelegate from '@/libs/cors';
import verifyReCaptcha from '@/libs/re-captcha';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

router.use(cors(corsOptionsDelegate));

router.post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const { captcha, username, email, password } = req.body;
    const verifyCaptcha = await verifyReCaptcha(captcha ?? '');

    if (!verifyCaptcha.data.success) {
      throw new Error('ERR_INVALID_CAPTCHA');
    }
    if (!username || !password) {
      return res.status(400).send('ERR_MISSING_PARAMS');
    }

    const existLoginUser = await User.findOne({ username });
    if (existLoginUser) {
      return res.status(400).send('ERR_LOGIN_EXISTS');
    }

    const existEmailUser = await User.findOne({ email });
    if (existEmailUser) {
      return res.status(400).send('ERR_PASSWORD_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    const session = { id: user.id };

    await setLoginSession(res, session);

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error);
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
