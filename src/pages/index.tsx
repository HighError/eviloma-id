import { faLink, faLock, faShare, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import Image from 'next/image';
import Router from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';
import Service from '@/components/Service';
import { UserContext } from '@/contexts/userContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout title="Eviloma ID - Профіль">
      <OnlyForAuth>
        <Header isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="flex flex-col gap-6 px-4 pb-3 pt-24">
          <div className=" relative w-full rounded-lg bg-gray-800">
            <div className="flex h-40 w-full items-center justify-center gap-5 rounded-t-lg bg-gradient-to-r from-[#ad5389] to-[#3c1053]" />
            <div className="absolute top-24 px-10">
              <Image
                className="h-32 w-32 rounded-full border-4 border-gray-800 bg-gray-900"
                src={`https://www.gravatar.com/avatar/${md5(user?.email ?? '0')}?s=256`}
                alt="avatar"
                width="128"
                height="128"
              />
            </div>
            <div className="flex w-full flex-col gap-1 rounded-lg bg-gray-800 px-10 pb-5 pt-20">
              <div className="flex flex-row items-center gap-4 ">
                <div className="text-3xl font-semibold">{`@${user?.username ?? ''}`}</div>
                <FontAwesomeIcon
                  className={`text-xl ${user?.private ? 'text-red-500' : 'text-green-500'}`}
                  icon={user?.private ? faLock : faUnlock}
                  data-tooltip-id="private-status"
                  data-tooltip-content={user?.private ? 'Приватний аккаунт' : 'Публічний аккаунт'}
                />
              </div>
              <div className="text-gray-400">{`ID: ${user?._id ?? ''}`}</div>
              <div className="text-gray-400">{`Email: ${user?.email ?? ''}`}</div>
              <div className="mt-5 flex flex-row gap-2">
                <button
                  disabled={user?.private || isLoading}
                  onClick={() =>
                    navigator.clipboard.writeText(`https://id.eviloma.org/user/@${user?.username ?? ''}`).then(() => {
                      toast('Посилання успішно скопійовано', {
                        icon: 'ℹ️',
                      });
                    })
                  }
                  className="flex flex-row items-center justify-center gap-2 rounded-lg bg-purple-800 px-5 py-3 duration-300 hover:bg-purple-700 disabled:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faShare} />
                  <div>Поділитись профілем</div>
                </button>
                <button
                  onClick={() => Router.push('/connections')}
                  className="flex flex-row items-center justify-center gap-2 rounded-lg bg-purple-800 px-5 py-3 duration-300 hover:bg-purple-700 disabled:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faLink} />
                  <div>З&apos;єднання</div>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
            <Service
              image="/family-dashboard.webp"
              title="Family Dashboard"
              link="https://family.eviloma.org/"
              isLoading={isLoading}
            />
          </div>
        </div>
        <Tooltip id="private-status" />
      </OnlyForAuth>
    </Layout>
  );
}
