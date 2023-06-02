import { Icon, IconifyIcon } from '@iconify/react';
import React from 'react';

interface IProps {
  title: string;
  description: string;
  icon: IconifyIcon;
}

export default function BlockInfo({ icon, title, description }: IProps) {
  return (
    <div className="rounded-lg border-2 border-ctp-overlay1 bg-ctp-surface1 px-3 py-2">
      <div className="mx-auto h-16 w-16 rounded-full border-2 border-ctp-overlay2 bg-ctp-surface2 p-3">
        <Icon icon={icon} className="m-auto h-full text-center align-middle text-3xl text-ctp-mauve" />
      </div>
      <h3 className="mt-2 text-center">{title}</h3>
      <p className="mt-4">{description}</p>
    </div>
  );
}
