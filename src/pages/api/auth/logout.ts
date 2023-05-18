import cors from 'cors';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { removeTokenCookie } from '@/libs/auth-cookies';
import corsOptionsDelegate from '@/libs/cors';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

const router = createRouter<NextApiRequestWithSession, NextApiResponse>();

router.use(cors(corsOptionsDelegate));
router.post(async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    removeTokenCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (err) {
    res.status(500).end();
  }
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
