import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import CustomError from '@/classes/CustomError';
import { getLoginSession } from '@/libs/auth';
import corsOptionsDelegate from '@/libs/cors';
import dbConnect from '@/libs/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

router.use(cors(corsOptionsDelegate));
router.get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
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

    res.status(200).json({ user });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).send(err.message);
    }
    return res.status(500).end('ERR_SERVER');
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
