import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="rounded-lg border-4 border-gray-800 bg-gray-900 shadow-2xl shadow-gray-900">
      <div className="relative h-32 w-full">
        <Image src={image} alt="alt" fill className="overflow-hidden rounded-t-lg object-cover" />
      </div>
      <div className="p-3">
        <h2 className="text-lg font-semibold tablet:text-3xl">{title}</h2>
        <span className="block">{description}</span>
        <button
          className="ml-auto mr-0 mt-3 flex flex-row items-center justify-center gap-2 rounded-full bg-purple-800 px-4 py-2 font-bold duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-700"
          onClick={() => Router.push(href)}
          disabled={btnDisable}
        >
          {btnText ?? t('goto')} <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
