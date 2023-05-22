import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  isLoading: boolean;
  onClick: () => void;
  icon: IconProp;
  className: string;
}

export default function SocialButton({ isLoading, onClick, icon, className }: IProps) {
  return (
    <button
      className={`${className} flex h-10 w-10 items-center justify-center rounded-lg p-2 duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-700`}
      disabled={isLoading}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
