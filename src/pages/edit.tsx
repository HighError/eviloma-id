import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/layouts/Layout';
import ChangePassword from '@/components/profileEditModule/ChangePassword';
import ChangeUsername from '@/components/profileEditModule/ChangeUsername';
import withAuthMiddleware from '@/middlewares/client/withAuth';

function Edit() {
  const { t } = useTranslation('edit');
  return (
    <Layout title={t('title')}>
      <div className="mx-auto flex flex-col gap-3 rounded-lg bg-ctp-surface0 p-3">
        <h2 className="text-center">{t('h3')}</h2>
        <div className="mt-2 grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          <ChangeUsername />
          <ChangePassword />
        </div>
      </div>
    </Layout>
  );
}

export default withAuthMiddleware(Edit);
