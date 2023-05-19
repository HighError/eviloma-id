import { NextApiResponse } from 'next';

import { getLoginSession } from '@/libs/auth';
import dbConnect from '@/libs/db';
import corsMiddleware from '@/middlewares/server/cors';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'DELETE') {
    try {
      await dbConnect();
      const session = await getLoginSession(req);
      if (!session || !session.id) {
        return res.status(401).end();
      }
      const user = await User.findById(session.id);

      if (!user) {
        return res.status(401).end();
      }

      user.discord = null;

      await user.save();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default corsMiddleware(handler);
