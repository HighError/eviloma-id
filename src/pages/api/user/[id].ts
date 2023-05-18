import cors from 'cors';
import mongoose from 'mongoose';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import corsOptionsDelegate from '@/libs/cors';
import dbConnect from '@/libs/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

router.use(cors(corsOptionsDelegate));
router.get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    await dbConnect();
    const token = req.headers.authorization;
    if (!token || token !== `Bearer ${process.env.API_KEY}`) {
      return res.status(401).end();
    }

    const { id } = req.query;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).end('ERR_INVALID_ID');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).end('ERR_UNKNOWN');
    }

    return res.status(200).json(user);
  } catch (error) {
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
