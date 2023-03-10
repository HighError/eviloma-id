import { NextApiRequest } from 'next';

export interface NextApiRequestWithSession extends NextApiRequest {
  session: {
    maxAge?: number;
  };
}
