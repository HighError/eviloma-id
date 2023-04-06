import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Router from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';

import { UserContext } from '@/contexts/userContext';

interface IProps {
  icon: IconProp;
  title: string;
  slug: string;
}

const Connection = ({ icon, title, slug }: IProps) => {
  const { user } = useContext(UserContext);

  async function unlink() {
    try {
      await axios.delete(`/api/connections/${slug}/unlink`);
      await mutate('/api/user');
      toast.success('Успіх!');
    } catch (err) {
      toast.error('Помилка серверу!');
    }
  }
  return (
    <div className="rounded-lg bg-gray-800 px-5 py-3">
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-lg bg-gray-500 p-2">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="text-xl font-medium">{title}</div>
      </div>
      {user?.discord && <div className="mt-2">ID: {user.discord}</div>}
      {!user?.discord && (
        <button
          disabled={false}
          className="mt-3 flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-purple-800 p-3 duration-300 hover:bg-purple-700 disabled:bg-gray-700"
          onClick={() => Router.push('/api/auth/discord')}
        >
          <FontAwesomeIcon icon={faLink} />
          <div>З&apos;єднати</div>
        </button>
      )}
      {user?.discord && (
        <button
          disabled={false}
          className="mt-3 flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-purple-800 p-3 duration-300 hover:bg-purple-700 disabled:bg-gray-700"
          onClick={() => unlink()}
        >
          <FontAwesomeIcon icon={faUnlink} />
          <div>Від&apos;єднати</div>
        </button>
      )}
    </div>
  );
};

export default Connection;
