import bcrypt from 'bcryptjs';
import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { setLoginSession } from '@/libs/auth';
import corsOptionsDelegate from '@/libs/cors';
import verifyReCaptcha from '@/libs/re-captcha';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
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
