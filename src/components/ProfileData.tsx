import { Icon, IconifyIcon } from '@iconify/react';
import React from 'react';

interface IProps {
  icon: IconifyIcon | string;
  data?: string;
}

export default function ProfileData({ icon, data }: IProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <Icon icon={icon} className="text-xl" />
      {data ?? ''}
    </div>
  );
}
