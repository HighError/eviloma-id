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
router.post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
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

    res.status(200).end();
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
