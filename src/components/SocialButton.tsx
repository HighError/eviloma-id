import { Icon } from '@iconify/react';
import React from 'react';

interface IProps {
  isLoading: boolean;
  onClick: () => void;
  icon: string;
}

export default function SocialButton({ isLoading, onClick, icon }: IProps) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-ctp-blue p-2 text-ctp-base duration-300 hover:bg-ctp-sapphire disabled:cursor-not-allowed disabled:bg-ctp-crust disabled:text-ctp-subtext0`}
      disabled={isLoading}
      onClick={onClick}
    >
      <Icon icon={icon} className="text-2xl" />
    </button>
  );
}
