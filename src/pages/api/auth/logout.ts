import cors from 'cors';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { removeTokenCookie } from '../../../libs/auth-cookies';
import corsOptionsDelegate from '../../../libs/cors';
import { NextApiRequestWithSession } from '../../../types/NextApiRequest';

export default nextConnect()
  .use(cors(corsOptionsDelegate))
  .options((res: NextApiResponse) => res.status(204).end())
  .post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      removeTokenCookie(res);
      res.writeHead(302, { Location: '/' });
      res.end();
    } catch (err) {
      res.status(500).end();
    }
  });
