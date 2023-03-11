import { faLock, faShare, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import md5 from 'md5';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { mutate } from 'swr';

import Layout from '../components/Layout';
import OnlyForAuth from '../components/routesControllers/OnlyForAuth';
import Service from '../components/Service';
import { UserContext } from '../contexts/userContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.status !== 200) {
        throw new Error('');
      }
      toast.success('Успішний вихід');
      mutate('/api/user', { data: null, error: null });
    } catch (err) {
      toast.error('Помилка серверу');
      console.log(err);
    }
  }

  return (
    <Layout title="Eviloma ID - Профіль">
      <OnlyForAuth>
        <div className="fixed top-0 z-50 flex h-20 w-full flex-row items-center justify-between gap-8 rounded-b-lg bg-gray-800 px-8">
          <div />
          <div className="flex flex-row items-center gap-2">
            <Image className="object-contain" src="/logo.webp" alt="logo" width="64" height="64" />
            <h1 className="text-4xl font-bold">Eviloma ID</h1>
          </div>
          <button
            disabled={isLoading}
            className="rounded-lg bg-purple-800 px-5 py-3 duration-300 hover:bg-purple-700"
            onClick={() => logout()}
          >
            Вийти
          </button>
        </div>
        <div className="flex flex-col gap-6 px-4 pt-24 pb-3">
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
            <div className="flex w-full flex-col gap-1 rounded-lg bg-gray-800 px-10 pt-20 pb-5">
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
              <div className="mt-5 flex flex-row">
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
