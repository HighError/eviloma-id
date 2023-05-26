import { Icon } from '@iconify/react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import toast from 'react-hot-toast';

import axios from '@/libs/axios';
import useLoading from '@/stores/useLoading';
import useUser from '@/stores/useUser';

interface IProps {
  title: string;
  slug: string;
  icon: string;
  status: string | undefined;
}

export default function Connection({ title, slug, icon, status }: IProps) {
  const { isLoading, setIsLoading } = useLoading();
  const { t } = useTranslation('connections');
  const { t: tNotification } = useTranslation('notifications');
  const updateUser = useUser((state) => state.updateUser);

  async function disconnect() {
    setIsLoading(true);
    try {
      await axios.delete(`/api/connections/${slug}/unlink`);
      await updateUser();
      toast.success(tNotification('disconnectSuccessful'));
    } catch (err) {
      toast.error(tNotification('serverError'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-gray-800 px-4 py-2 tablet:flex-row tablet:justify-between">
      <div className="flex flex-row items-center gap-3">
        <Icon icon={icon} className="text-3xl" />
        <h3>{title}</h3>
      </div>
      <div className="mt-3 flex flex-col items-center gap-3 tablet:mt-0 tablet:flex-row tablet:gap-8">
        <div>{status ?? ''}</div>
        <button
          className={`${
            status ? 'bg-red-700 hover:bg-red-600' : 'bg-purple-700 hover:bg-purple-600'
          } rounded-lg  px-4 py-2 duration-300  enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-800`}
          disabled={isLoading}
          onClick={() => {
            status ? disconnect() : Router.push(`/api/auth/${slug}`);
          }}
        >
          {status ? t('disconnectButton') : t('connectButton')}
        </button>
      </div>
    </div>
  );
}
