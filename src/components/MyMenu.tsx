import { Menu, Transition } from '@headlessui/react';
import accountEdit from '@iconify/icons-mdi/account-edit';
import connectionIcon from '@iconify/icons-mdi/connection';
import faceManProfile from '@iconify/icons-mdi/face-man-profile';
import fileAlert from '@iconify/icons-mdi/file-alert';
import logoutIcon from '@iconify/icons-mdi/logout';
import menuIcon from '@iconify/icons-mdi/menu';
import serverIcon from '@iconify/icons-mdi/server';
import { Icon } from '@iconify/react';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment } from 'react';
import toast from 'react-hot-toast';

import axios from '@/libs/axios';
import useLoading from '@/stores/useLoading';
import useUser from '@/stores/useUser';

export default function MyMenu() {
  const { isLoading, setIsLoading } = useLoading();
  const { t: tNotification } = useTranslation('notifications');
  const { t: tMenu } = useTranslation('menu');
  const updateUser = useUser((state) => state.updateUser);

  async function logout() {
    setIsLoading(true);
    try {
      await axios.post('/api/auth/logout');
      await updateUser();
      setIsLoading(false);
      toast.success(tNotification('successfulExit'));
    } catch (err) {
      toast.error(tNotification('serverError'));
      setIsLoading(false);
    }
  }

  const menuItems = [
    {
      slug: 'links',
      items: [
        {
          slug: 'profile',
          name: tMenu('profile'),
          icon: faceManProfile,
          onClick: () => {
            Router.push('/');
          },
        },
        {
          slug: 'services',
          name: tMenu('services'),
          icon: serverIcon,
          onClick: () => {
            Router.push('/services');
          },
        },
        {
          slug: 'terms',
          name: tMenu('termsAndConditions'),
          icon: fileAlert,
          onClick: () => {
            Router.push('/terms');
          },
        },
      ],
    },
    {
      slug: 'profile',
      items: [
        {
          slug: 'edit-profile',
          name: tMenu('editProfile'),
          icon: accountEdit,
          onClick: () => {
            Router.push('/edit');
          },
        },
        {
          slug: 'connections-profile',
          name: tMenu('connectionsProfile'),
          icon: connectionIcon,
          onClick: () => {
            Router.push('/connections');
          },
        },
        {
          slug: 'logout',
          name: tMenu('logout'),
          icon: logoutIcon,
          onClick: () => {
            logout();
          },
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <Menu>
        <Menu.Button
          disabled={isLoading}
          className="select-none rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          <div className="flex items-center gap-1">
            <Icon icon={menuIcon} className="inline text-2xl" /> <span>{tMenu('title')}</span>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-12 max-h-[75vh] w-max gap-1 divide-y divide-gray-100 overflow-auto rounded-lg bg-gray-900 p-2 shadow-2xl shadow-black tablet:mt-2">
            {menuItems.map((group) => (
              <div key={group.slug}>
                {group.items.map((item) => (
                  <Menu.Item key={item.slug}>
                    <button
                      disabled={isLoading}
                      onClick={item.onClick}
                      className="my-1.5 flex w-full flex-row items-center gap-3 rounded-lg px-3 py-2 duration-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
                    >
                      <Icon icon={item.icon} className="w-6 text-2xl" />
                      <div>{item.name}</div>
                    </button>
                  </Menu.Item>
                ))}
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
