import { NextApiResponse } from 'next';
import notification from 'next-connect';

import { NextApiRequestWithSession } from '@/types/NextApiRequest';

export default notification().get(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const cookie = req.headers.cookie;
    return res.end(cookie);
  } catch (err) {
    return res.status(500).end();
  }
});
