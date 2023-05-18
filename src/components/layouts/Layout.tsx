import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import MyMenu from '@/components/MyMenu';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';

interface IProps {
  children: React.ReactNode;
  title: string;
  disablePadding?: boolean;
}

export default function Layout({ children, title, disablePadding }: IProps) {
  const { t } = useTranslation('common');
  return (
    <AnimatedLayout title={title}>
      <OnlyForAuth>
        <div className="fixed top-0 z-50 flex w-full flex-row items-center justify-between px-5 py-3 backdrop-blur-md">
          <div className="flex flex-row items-center gap-3">
            <Image className="select-none" src="/logo.webp" alt="logo" width={50} height={50} />
            <h1 className="text-xl font-bold tablet:text-4xl">{t('title')}</h1>
          </div>
          <MyMenu />
        </div>
        <div className={`min-h-[100dvh] ${!disablePadding && 'pb-10 pt-20'} relative px-4`}>{children}</div>
      </OnlyForAuth>
    </AnimatedLayout>
  );
}
