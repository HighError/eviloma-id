import { NextApiResponse } from 'next';

import passport from '@/libs/passport';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

function passportMiddleware(handler: (req: NextApiRequestWithSession, res: NextApiResponse) => unknown) {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    passport.initialize();
    return handler(req, res);
  };
}

export default passportMiddleware;
