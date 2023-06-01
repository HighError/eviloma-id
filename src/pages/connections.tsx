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
    <Layout title={t('title')}>
      <div className="mx-auto mt-5 rounded-lg bg-ctp-surface0 px-4 pb-5 pt-3">
        <h2 className="mt-3 text-center">{t('titleH3')}</h2>
        <div className="mt-2 grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          <Connection title="Discord" slug="discord" icon="bxl:discord-alt" status={user?.discord ?? undefined} />
          <Connection title="Google" slug="google" icon="bxl:google" status={user?.google ?? undefined} />
        </div>
      </div>
    </Layout>
  );
}

export default withAuthMiddleware(Connections);
