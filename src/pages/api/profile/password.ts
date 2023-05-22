import bcrypt from 'bcryptjs';
import { NextApiResponse } from 'next';

import dbConnect from '@/libs/db';
import authMiddleware from '@/middlewares/server/auth';
import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse, user: IUser) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      await dbConnect();
      const { oldPass, newPass } = req.body;
      if (!oldPass || !newPass) {
        return res.status(400).end('ERR_MISSING_PARAMS');
      }

      const matchOldPass = await bcrypt.compare(oldPass, user.password);

      if (!matchOldPass) {
        return res.status(400).end('ERR_WRONG_PASSWORD');
      }

      user.password = await bcrypt.hash(newPass, 10);

      await user.save();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default authMiddleware(handler, true);
