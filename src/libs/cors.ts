import { CorsOptions } from 'cors';

import { NextApiRequestWithSession } from '../types/NextApiRequest';

const whitelist = (process.env.CORS ?? '').split(',');

const corsOptionsDelegate = function (
  req: NextApiRequestWithSession,
  callback: (error: Error | null, corsOptions: CorsOptions) => void
) {
  const corsOptions: CorsOptions = { origin: whitelist.indexOf(req.headers.origin ?? '') !== -1 };
  callback(null, corsOptions);
};

export default corsOptionsDelegate;
