import bcrypt from 'bcryptjs';
import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import User from '@/models/User';

import { setLoginSession } from '../../../libs/auth';
import corsOptionsDelegate from '../../../libs/cors';
import { NextApiRequestWithSession } from '../../../types/NextApiRequest';

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !password) {
        return res.status(400).send('Один або декілька параметрів не задано');
      }

      const existLoginUser = await User.findOne({ username });
      if (existLoginUser) {
        return res.status(400).send('Користувач з таким логіном вже існує');
      }

      const existEmailUser = await User.findOne({ email });
      if (existEmailUser) {
        return res.status(400).send('Користувач з таким e-mail вже існує');
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
