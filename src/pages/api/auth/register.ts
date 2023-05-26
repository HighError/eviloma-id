import bcrypt from 'bcryptjs';
import { NextApiResponse } from 'next';

import { setLoginSession } from '@/libs/authCookies';
import reCaptchaMiddleware from '@/middlewares/server/reCaptcha';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      const { username, email, password } = req.body;
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

      return res.status(200).end();
    } catch (error) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default reCaptchaMiddleware(handler);
