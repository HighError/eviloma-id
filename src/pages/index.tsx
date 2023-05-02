import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import md5 from 'md5';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React, { useContext, useEffect } from 'react';

import Layout from '@/components/layouts/Layout';
import ProfileData from '@/components/ProfileData';
import { UserContext } from '@/contexts/userContext';

export default function Index() {
  const { t } = useTranslation('profile');
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useContext(UserContext);
  const [discord, setDiscord] = React.useState('...');

  useEffect(() => {
    if (!user?.discord) {
      setDiscord(t('discordDontConnected'));
    } else {
      axios
        .get(`https://discordlookup.mesavirep.xyz/v1/user/${user.discord}`)
        .then((res) => {
          setDiscord(res.data.tag);
        })
        .catch((err) => {
          console.log(err);
          setDiscord(t('discordConnectedButFailLoadingName'));
        });
    }
    setIsLoading(false);
  }, [user]);

  return (
    <Layout isLoading={isLoading} setIsLoading={setIsLoading} title={t('title')} disablePadding>
      <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-800 px-8 py-6 shadow-lg shadow-gray-900">
        <div className="mx-auto w-32 rounded-full bg-gray-50 p-1">
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
        <div className="text-sm text-gray-300">{user?._id ?? ''}</div>
        <div className="mt-3 flex flex-col gap-1 text-gray-300">
          <ProfileData icon={faAt} data={user?.email} />
          <ProfileData icon={faLock} data={t('privateProfile')} />
          <ProfileData icon={faGoogle} data={t('comingSoon')} />
          <ProfileData icon={faDiscord} data={discord} />
        </div>
      </div>
    </Layout>
  );
}
