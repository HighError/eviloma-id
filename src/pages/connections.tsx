import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Connection from '@/components/Connection';
import Layout from '@/components/layouts/Layout';
import withAuthMiddleware from '@/middlewares/client/withAuth';
import useUser from '@/stores/useUser';

function Connections() {
  const user = useUser((state) => state.user);
  const { t } = useTranslation('connections');

  return (
    <Layout title="Connections">
      <div className="mx-auto mt-5 max-w-sm rounded-lg bg-gray-900 px-4 py-2 tablet:max-w-2xl">
        <h2 className="mt-3 text-center">{t('titleH3')}</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Connection title="Discord" slug="discord" icon={faDiscord} status={user?.discord ?? undefined} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuthMiddleware(Connections);
