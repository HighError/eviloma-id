import { NextApiResponse } from 'next';

import { getLoginSession } from '@/libs/auth-cookies';
import dbConnect from '@/libs/db';
import User, { IUser } from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

function authMiddleware(
  handler: (req: NextApiRequestWithSession, res: NextApiResponse, user: IUser) => unknown,
  password?: boolean
) {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      await dbConnect();
      const session = await getLoginSession(req.cookies || req.headers.cookie || []);
      if (!session || !session.id) {
        return res.status(401).end();
      }
      const user = await User.findById(session.id).select(password ? '+password' : '');
      if (!user) {
        return res.status(401).end();
      }
      return handler(req, res, user);
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  };
}

export default authMiddleware;
