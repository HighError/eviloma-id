import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  icon: IconProp;
  data?: string;
}

export default function ProfileData({ icon, data }: IProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <FontAwesomeIcon icon={icon} className="w-4" />
      {data ?? ''}
    </div>
  );
}
