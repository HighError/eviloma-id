import Image from 'next/image';
import React from 'react';

import AnimatedLayout from '@/components/AnimatedLayout';
import ProfileMenu from '@/components/profile/ProfileMenu';
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
          <ProfileMenu isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <div className="fixed inset-0 -z-10">
          <Image src="/profile-banner.png" alt="profile-banner" fill className="object-cover object-left" />
        </div>
      </OnlyForAuth>
    </AnimatedLayout>
  );
}
