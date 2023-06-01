import arrowRightThick from '@iconify/icons-mdi/arrow-right-thick';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Router from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface IProps {
  title: string;
  description: string;
  image: string;
  href: string;
  btnDisable?: boolean;
  btnText?: string;
}

export default function ServiceCard({ title, description, image, href, btnDisable, btnText }: IProps) {
  const { t } = useTranslation('services');
  return (
    <div className="rounded-lg border-4 border-ctp-overlay0 bg-ctp-surface0 shadow-2xl shadow-ctp-surface1">
      <div className="relative h-32 w-full">
        <Image src={image} alt="alt" fill className="overflow-hidden rounded-t-lg object-cover" />
      </div>
      <div className="p-3">
        <h2 className="text-lg font-semibold tablet:text-3xl">{title}</h2>
        <span className="block">{description}</span>
        <button
          className="ml-auto mr-0 mt-3 flex flex-row items-center justify-center gap-3 rounded-lg bg-ctp-mauve px-4 py-2 text-ctp-base duration-300 hover:bg-ctp-pink enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-ctp-crust disabled:text-ctp-subtext0"
          onClick={() => Router.push(href)}
          disabled={btnDisable}
        >
          {btnText ?? t('goto')} <Icon icon={arrowRightThick} className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
