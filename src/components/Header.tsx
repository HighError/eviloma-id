import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

interface IProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isLoading, setIsLoading }: IProps) => {
  async function logout() {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.status !== 200) {
        throw new Error('');
      }
      toast.success('Успішний вихід');
      mutate('/api/user', { data: null, error: null });
    } catch (err) {
      toast.error('Помилка серверу');
      console.log(err);
    }
  }

  return (
    <div className="fixed top-0 z-50 flex h-20 w-full flex-row items-center justify-between gap-8 rounded-b-lg bg-gray-800 px-8">
      <Link href={`/`} className="duration-300 hover:text-purple-600">
        Профіль
      </Link>
      <div className="flex flex-row items-center gap-2">
        <Image className="object-contain" src="/logo.webp" alt="logo" width="64" height="64" />
        <h1 className="text-2xl font-bold tablet:text-3xl laptop:text-4xl">Eviloma ID</h1>
      </div>
      <button
        disabled={isLoading}
        className="rounded-lg bg-purple-800 px-5 py-3 duration-300 hover:bg-purple-700"
        onClick={() => logout()}
      >
        Вийти
      </button>
    </div>
  );
};

export default Header;
