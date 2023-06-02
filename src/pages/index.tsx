import accountPlus from '@iconify/icons-mdi/account-plus';
import accountSync from '@iconify/icons-mdi/account-sync';
import humanIcon from '@iconify/icons-mdi/human';
import lockIcon from '@iconify/icons-mdi/lock';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import BlockInfo from '@/components/landing/BlockInfo';
import Layout from '@/components/layouts/Layout';

export default function Index() {
  const { t } = useTranslation('landing');
  return (
    <Layout title="Eviloma ID" enableBackground>
      <div className="mx-auto max-w-4xl rounded-lg py-2">
        <h2 className="text-center text-3xl tablet:text-4xl">{t('title')}</h2>
        <p className="mt-3">{t('description')}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 tablet:grid-cols-3">
          <BlockInfo icon={humanIcon} title={t('blockInfo1Title')} description={t('blockInfo1Description')} />
          <BlockInfo icon={lockIcon} title={t('blockInfo2Title')} description={t('blockInfo2Description')} />
          <BlockInfo icon={accountSync} title={t('blockInfo3Title')} description={t('blockInfo3Description')} />
        </div>
        <h3 className="mt-5 text-center">{t('text1')}</h3>
        <p>{t('text2')}</p>
        <Link
          className="mt-2 flex flex-row items-center justify-center gap-2 rounded-lg bg-ctp-mauve px-3 py-2 text-ctp-base duration-300 hover:bg-ctp-pink"
          href="/register"
        >
          <Icon icon={accountPlus} className="text-2xl " />
          <span>{t(`registerButtonText`)}</span>
        </Link>
      </div>
    </Layout>
  );
}
