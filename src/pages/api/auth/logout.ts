import { NextApiResponse } from 'next';

import { removeTokenCookie } from '@/libs/authCookies';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const handler = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const method = req.method;

  if (method === 'POST') {
    try {
      removeTokenCookie(res);
      res.writeHead(302, { Location: '/' });
      return res.end();
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  }

  return res.status(405).end('Method Not Allowed');
};

export default handler;
