import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import CustomError from '@/classes/CustomError';
import { getLoginSession } from '@/libs/auth';
import corsOptionsDelegate from '@/libs/cors';
import dbConnect from '@/libs/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .delete(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
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

      res.status(200).end();
    } catch (err) {
      console.log(err);
      if (err instanceof CustomError) {
        return res.status(err.code).send(err.message);
      }
      return res.status(500).end('ERR_UNKNOWN');
    }
  });
