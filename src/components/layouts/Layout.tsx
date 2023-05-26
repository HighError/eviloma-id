import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React, { ReactNode } from 'react';

import LanguageMenu from '@/components/LanguageMenu';
import MyMenu from '@/components/MyMenu';
import useUser from '@/stores/useUser';

const { locales } = i18nConfig;

interface IProps {
  children: ReactNode;
  title: string;
  disablePadding?: boolean;
}

export default function Layout({ children, title, disablePadding }: IProps) {
  const { t } = useTranslation('common');
  const user = useUser((state) => state.user);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.div
        className={`min-h-[100dvh]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="fixed top-0 z-50 flex w-full flex-row items-center justify-between px-5 py-3 backdrop-blur-md">
          <div className="flex flex-row items-center gap-3">
            <Image className="select-none" src="/logo.webp" alt="logo" width={50} height={50} />
            <h1 className="text-xl font-bold tablet:text-4xl">{t('title')}</h1>
          </div>
          <div className="flex flex-row gap-5">
            {locales && <LanguageMenu locales={locales} />}
            {user && <MyMenu />}
          </div>
        </div>
        <div className={`min-h-[100dvh] ${!disablePadding && 'pb-10 pt-20'} relative px-4 py-2`}>{children}</div>
      </motion.div>
    </>
  );
}
