import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

interface IProps {
  image: string;
  title: string;
  link: string;
  disable?: boolean;
  isLoading: boolean;
}

const Service = ({ image, title, link, disable, isLoading }: IProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-gray-800 px-5 py-3">
      <div className="flex flex-row items-center justify-around">
        <Image src={image} alt={`${title} logo`} width="64" height="64" />
        <div className="text-2xl font-semibold">{title}</div>
      </div>
      <button
        className="rounded-lg bg-purple-800 p-3 duration-300 hover:bg-purple-700 disabled:bg-gray-700"
        disabled={disable || isLoading}
        onClick={() => {
          Router.push(link);
        }}
      >
        {disable ? 'Недоступно' : 'Перейти'}
      </button>
    </div>
  );
};

export default Service;
