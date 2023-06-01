import { Menu, Transition } from '@headlessui/react';
import earthIcon from '@iconify/icons-mdi/earth';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useEffect } from 'react';

import getLanguageCode from '@/libs/getLanguageCode';
import useLoading from '@/stores/useLoading';

interface IProps {
  locales: string[];
}

export default function LanguageMenu({ locales }: IProps) {
  const isLoading = useLoading((state) => state.isLoading);
  const { locale, defaultLocale } = useRouter();
  const { t } = useTranslation();

  useEffect(persistLocaleCookie, [locale, defaultLocale]);

  function persistLocaleCookie() {
    const date = new Date();
    if (locale !== defaultLocale) {
      const expireMs = 25 * 12 * 30 * 24 * 60 * 60 * 1000;
      date.setTime(date.getTime() + expireMs);
    }
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
  }

  return (
    <div className="relative">
      <Menu>
        <Menu.Button
          disabled={isLoading}
          className="select-none rounded-lg bg-ctp-mauve px-3 py-2 text-ctp-base duration-300 hover:bg-ctp-pink disabled:cursor-not-allowed disabled:bg-ctp-crust disabled:text-ctp-subtext0 "
        >
          <Icon icon={earthIcon} className="inline text-2xl" />
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
          <Menu.Items className="absolute right-0 top-12 max-h-[75vh] w-max gap-1 overflow-auto rounded-lg bg-ctp-surface0 p-2 shadow-2xl shadow-black tablet:mt-2">
            {locales.map((locale) => (
              <Menu.Item key={locale}>
                <button
                  onClick={async () => {
                    await setLanguage(locale);
                    localStorage.setItem('locale', locale);
                  }}
                  className="my-1.5 flex w-full flex-row items-center gap-3 rounded-lg px-3 py-2 duration-300 hover:bg-ctp-surface1 disabled:cursor-not-allowed disabled:hover:bg-ctp-surface0"
                >
                  <Icon icon={`circle-flags:${getLanguageCode(locale)}`} />
                  {t(`languages:${locale}`)}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
