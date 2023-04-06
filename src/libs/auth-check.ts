import { NextApiRequestWithSession } from '@/types/NextApiRequest';

import { getLoginSession } from './auth';

export default async function verifyAuth(req: NextApiRequestWithSession): Promise<string | null> {
  const session = await getLoginSession(req);
  if (!session || !session.id) {
    return null;
  }
  return session;
}
