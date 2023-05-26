import { NextApiResponse } from 'next';

import verifyReCaptcha from '@/libs/reCaptcha';
import { NextApiRequestWithSession } from '@/types/NextApiRequest';

function reCaptchaMiddleware(handler: (req: NextApiRequestWithSession, res: NextApiResponse) => unknown) {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const { captcha } = req.body;
      const verifyCaptcha = await verifyReCaptcha(captcha ?? '');
      if (!verifyCaptcha.data.success) {
        return res.status(422).end('ERR_INVALID_CAPTCHA');
      }
      return handler(req, res);
    } catch (err) {
      return res.status(500).end('ERR_SERVER');
    }
  };
}

export default reCaptchaMiddleware;
