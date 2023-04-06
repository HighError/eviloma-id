import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import * as yup from 'yup';

import getCallbackErrorMessage from '@/libs/callback-errors';

import Input from '../components/inputs/Input';
import PasswordInput from '../components/inputs/Passwordinput';
import Layout from '../components/Layout';
import OnlyForNotAuth from '../components/routesControllers/OnlyForNotAuth';
import getExternalServiceLink from '../libs/external-services';

type Inputs = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required("Це поле обов'язкове"),
    password: yup.string().required("Це поле обов'язкове"),
  })
  .required();

const LoginPage = () => {
  const router = useRouter();
  const redirect = router.query['redirect'];
  let callback_error = router.query['callback_error'];
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/auth/login', data)
      .then(() => {
        toast.success('Успішний вхід');
        if (redirect) {
          const link = encodeURI(getExternalServiceLink(redirect as string));
          router.push(link);
        }
        mutate('/api/user');
      })
      .catch((err: AxiosError) => toast.error((err.response?.data as string) ?? 'Невідома помилка'));
    setIsLoading(false);
  };

  useEffect(() => {
    if (callback_error) {
      toast.error(getCallbackErrorMessage(callback_error as string));
      callback_error = undefined;
    }
  }, [callback_error]);

  return (
    <Layout title="Eviloma ID - Вхід">
      <OnlyForNotAuth>
        <Head>
          <title>Eviloma ID - Вхід</title>
        </Head>
        <div className="flex h-full select-none flex-row">
          <div className="flex w-screen items-center justify-center px-2 duration-300 tablet:w-7/12 laptop:w-5/12">
            <div className="flex flex-col gap-5 rounded-lg px-3 py-2">
              <div>
                <Image className="object-contain" src="/logo.webp" alt="logo" width="100" height="100" />
                <h1 className="text-3xl font-bold">Eviloma ID - Вхід</h1>
                <span className="text-sm text-gray-400">Увійдіть в систему Eviloma</span>
              </div>
              <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                  <Input
                    id="username"
                    label="Логін"
                    placeholder="Username"
                    icon={faUser}
                    register={register}
                    error={errors.username}
                  />
                  <PasswordInput id="password" label="Пароль" register={register} error={errors.password} />
                </div>
                <button
                  className="rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:scale-105 hover:bg-purple-700 disabled:bg-gray-800"
                  type="submit"
                  disabled={isLoading}
                >
                  Увійти
                </button>
              </form>
              <div className="grid grid-cols-7">
                <button
                  className="rounded-lg bg-[#7289da] p-2 duration-300 hover:bg-purple-700 disabled:bg-gray-800"
                  disabled={isLoading}
                  onClick={() => Router.push('/api/auth/discord')}
                >
                  <FontAwesomeIcon icon={faDiscord} />
                </button>
              </div>
              <div>
                {'Ще не маєте аккаунта? '}
                <Link
                  href={`/register?redirect=${redirect ?? ''}`}
                  className="text-purple-800 duration-300 hover:text-purple-600"
                >
                  Зареєструватись
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-full duration-300 tablet:w-5/12 laptop:w-7/12">
            <Image className="object-cover" src="/login.webp" alt="" fill priority sizes="100vw" />
          </div>
        </div>
      </OnlyForNotAuth>
    </Layout>
  );
};

export default LoginPage;
