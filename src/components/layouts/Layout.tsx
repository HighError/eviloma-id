import Image from 'next/image';
import React from 'react';

import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import MyMenu from '@/components/MyMenu';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export default function Layout({ children, isLoading, setIsLoading, title }: IProps) {
  return (
    <AnimatedLayout title={title}>
      <OnlyForAuth>
        {children}
        <div className="absolute right-5 top-5 z-10">
          <MyMenu isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </OnlyForAuth>
    </AnimatedLayout>
  );
}
