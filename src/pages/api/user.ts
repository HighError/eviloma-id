import { NextApiResponse } from 'next';

import authMiddleware from '@/middlewares/server/auth';
import corsMiddleware from '@/middlewares/server/cors';
import { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse, user: IUser) => {
  const method = req.method;

  if (method === 'GET') {
    try {
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }
  return res.status(405).end('Method not allowed');
};

export default corsMiddleware(authMiddleware(handler));
