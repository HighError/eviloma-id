import { faBoxesStacked, faLink, faPen, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';
import Router from 'next/router';
import React, { Fragment } from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

interface IProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileMenu({ isLoading, setIsLoading }: IProps) {
  async function logout() {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.status !== 200) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('');
      }
      await mutate('/api/user', { data: null, error: null });
      Router.push('/login');
      toast.success('Успішний вихід');
    } catch (err) {
      toast.error('Помилка серверу');
    }
  }
  const menuItems = [
    {
      slug: 'links',
      items: [
        {
          disabled: false,
          slug: 'profile',
          name: 'Профіль',
          icon: faUser,
          onClick: () => {
            Router.push('/');
          },
        },
        {
          disabled: false,
          slug: 'services',
          name: 'Наші сервіси',
          icon: faBoxesStacked,
          onClick: () => {
            Router.push('/services');
          },
        },
      ],
    },
    {
      slug: 'profile',
      items: [
        {
          disabled: true,
          slug: 'edit-profile',
          name: 'Редагувати профіль',
          icon: faPen,
          onClick: () => {
            Router.push('/edit');
          },
        },
        {
          disabled: true,
          slug: 'link-profile',
          name: "З'єднання",
          icon: faLink,
          onClick: () => {
            Router.push('/edit');
          },
        },
        {
          disabled: false,
          slug: 'logout',
          name: 'Вийти',
          icon: faRightFromBracket,
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
        <Menu.Button>
          <button
            disabled={isLoading}
            className="rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Меню
          </button>
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
          <Menu.Items className="absolute right-0 top-12 max-h-96 w-max gap-1 divide-y divide-gray-100 overflow-auto rounded-lg bg-gray-600 p-2 shadow-2xl shadow-gray-900 tablet:mt-2 tablet:max-h-60">
            {menuItems.map((group) => (
              <div key={group.slug}>
                {group.items.map((item) => (
                  <Menu.Item key={item.slug}>
                    <button
                      disabled={item.disabled || isLoading}
                      onClick={item.onClick}
                      className="my-1.5 flex w-full flex-row items-center gap-3 rounded-lg px-3 py-2 duration-300 hover:bg-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-6" />
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
