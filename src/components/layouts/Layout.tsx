import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { bool } from 'yup';

import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import MyMenu from '@/components/MyMenu';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  disablePadding?: boolean;
}

export default function Layout({ children, isLoading, setIsLoading, title, disablePadding }: IProps) {
  const { t } = useTranslation('common');
  return (
    <AnimatedLayout title={title}>
      <OnlyForAuth>
        <div className={`min-h-[100dvh] ${!disablePadding && 'pb-10 pt-20'} relative px-4`}>{children}</div>
        <div className="fixed top-0 z-50 flex w-full flex-row items-center justify-between px-5 py-3 backdrop-blur-md">
          <div className="flex flex-row items-center gap-3">
            <Image src="/logo.webp" alt="logo" width={50} height={50} />
            <h1 className="text-xl font-bold tablet:text-4xl">{t('title')}</h1>
          </div>
          <MyMenu isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </OnlyForAuth>
    </AnimatedLayout>
  );
}
