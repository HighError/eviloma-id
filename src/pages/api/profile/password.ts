import bcrypt from 'bcryptjs';
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
      const user = await User.findById(session.id).select('+password');

      if (!user) {
        return res.status(401).end();
      }

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

export default handler;
