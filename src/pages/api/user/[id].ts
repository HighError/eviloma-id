import mongoose from 'mongoose';
import { NextApiResponse } from 'next';

import dbConnect from '@/libs/db';
import corsMiddleware from '@/middlewares/server/cors';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'GET') {
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
  }
  return res.status(405).end('Method not allowed');
};

export default corsMiddleware(handler);
