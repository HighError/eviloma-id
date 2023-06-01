import { NextApiResponse } from 'next';

import dbConnect from '@/libs/db';
import authMiddleware from '@/middlewares/server/auth';
import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse, user: IUser) => {
  const method = req.method;

  if (method === 'DELETE') {
    try {
      await dbConnect();

      user.google = null;

      await user.save();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default authMiddleware(handler);
