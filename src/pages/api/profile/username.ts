import { NextApiResponse } from 'next';

import dbConnect from '@/libs/db';
import authMiddleware from '@/middlewares/server/auth';
import User, { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse, user: IUser) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      await dbConnect();
      const { username } = req.body;
      if (!username) {
        return res.status(400).end('ERR_MISSING_PARAMS');
      }
      const existsUsername = await User.findOne({ username });

      if (existsUsername) {
        return res.status(400).end('ERR_LOGIN_ALREADY_EXISTS');
      }

      user.username = username;

      await user.save();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default authMiddleware(handler);
