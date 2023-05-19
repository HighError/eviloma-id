import { NextApiResponse } from 'next';

import { getLoginSession } from '@/libs/auth';
import dbConnect from '@/libs/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      await dbConnect();
      const session = await getLoginSession(req);
      if (!session || !session.id) {
        return res.status(401).end();
      }
      const { username } = req.body;
      if (!username) {
        return res.status(400).end('ERR_MISSING_PARAMS');
      }
      const user = await User.findOne({ username });

      if (user) {
        return res.status(400).end('ERR_LOGIN_ALREADY_EXISTS');
      }

      const activeUser = await User.findById(session.id);

      if (!activeUser) {
        return res.status(401).end();
      }

      activeUser.username = username;

      await activeUser.save();

      return res.status(200).end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default handler;
