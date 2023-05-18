import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/layouts/Layout';
import ChangePassword from '@/components/profileEditModule/ChangePassword';
import ChangeUsername from '@/components/profileEditModule/ChangeUsername';

export default function Edit() {
  const { t } = useTranslation('edit');
  return (
    <Layout title={t('title')}>
      <div className="mx-auto flex max-w-lg flex-col gap-3 rounded-lg bg-gray-900 p-3">
        <h2 className="text-center">{t('h3')}</h2>
        <ChangeUsername />
        <ChangePassword />
      </div>
    </Layout>
  );
}
