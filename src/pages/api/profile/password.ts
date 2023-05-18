import bcrypt from 'bcryptjs';
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

    res.status(200).end();
  } catch (err) {
    console.log(err);
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
