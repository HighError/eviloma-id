import accountLock from '@iconify/icons-mdi/account-lock';
import atIcon from '@iconify/icons-mdi/at';
import md5 from 'md5';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/layouts/Layout';
import ProfileData from '@/components/ProfileData';
import withAuthMiddleware from '@/middlewares/client/withAuth';
import useUser from '@/stores/useUser';

function Index() {
  const { t } = useTranslation('profile');
  const { user, discord } = useUser();
  return (
    <Layout title={t('title')} disablePadding>
      <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-ctp-surface0 px-8 py-6 shadow-lg shadow-gray-900">
        <div className="mx-auto w-32 rounded-full bg-ctp-overlay0 p-1">
          <Image
            className="select-none rounded-full"
            src={`https://www.gravatar.com/avatar/${md5(user?.email ?? '0')}?s=128`}
            unoptimized
            priority
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="m-auto mt-4 text-2xl font-semibold">{user?.username ?? ''}</div>
        <div className="text-sm  text-ctp-subtext0">{user?._id ?? ''}</div>
        <div className="mt-3 flex flex-col gap-1 text-ctp-subtext0">
          <ProfileData icon={atIcon} data={user?.email} />
          <ProfileData icon={accountLock} data={t('privateProfile')} />
          <ProfileData
            icon="bxl:discord-alt"
            data={discord.error ? t('discordConnectedButFailLoadingName') : discord.data ?? t('discordDontConnected')}
          />
        </div>
      </div>
    </Layout>
  );
}

export default withAuthMiddleware(Index);
