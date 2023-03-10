import cors from 'cors';
import mongoose from 'mongoose';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import corsOptionsDelegate from '@/libs/cors';
import dbConnect from '@/libs/db';
import User from '@/models/User';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      await dbConnect();
      const token = req.headers.authorization;
      if (!token || token !== `Bearer ${process.env.API_KEY}`) {
        return res.status(401).end();
      }

      const { id } = req.query;

      if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).end();
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).end();
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).end('Authentication token is invalid, please log in');
    }
  });
