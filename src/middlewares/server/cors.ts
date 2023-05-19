import Cors from 'cors';
import { NextApiResponse } from 'next';

import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const whiteListOrigins = (process.env.CORS || '').split(',');

const cors = Cors({
  origin: whiteListOrigins,
  methods: ['*'],
  credentials: true,
});

function corsMiddleware(handler: (req: NextApiRequestWithSession, res: NextApiResponse) => unknown) {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    await new Promise((resolve, reject) => {
      cors(req, res, (result) => {
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    });
    return handler(req, res);
  };
}

export default corsMiddleware;
