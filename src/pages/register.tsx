import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import * as yup from 'yup';

import Input from '../components/inputs/Input';
import PasswordInput from '../components/inputs/Passwordinput';
import Layout from '../components/Layout';
import OnlyForNotAuth from '../components/routesControllers/OnlyForNotAuth';

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  terms: boolean;
};

const schema = yup
  .object({
    username: yup
      .string()
      .min(4, 'Мінімальна довжина логіну 4 символи!')
      .max(20, 'Максимальна довжина логіну 20 символів!')
      .required("Це поле обов'язкове"),
    email: yup.string().email('Введіть валідний email').required("Це поле обов'язкове"),
    password: yup.string().min(8, 'Мінімальна довжина паролю 8 символів').required("Це поле обов'язкове"),
    cpassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Паролі не збігаються')
      .required("Це поле обов'язкове"),
  })
  .required();

const LoginPage = () => {
  const router = useRouter();
  const redirect = router.query['redirect'];
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/auth/register', data)
      .then(() => {
        toast.success('Успішна реєстрація');
        mutate('/api/user');
        if (redirect) {
          router.push(encodeURI(redirect as string));
        }
      })
      .catch((err: AxiosError) => toast.error((err.response?.data as string) ?? 'Невідома помилка'));
    setIsLoading(false);
  };

  return (
    <Layout title="Eviloma ID - Реєстрація">
      <OnlyForNotAuth>
        <Head>
          <title>Eviloma ID - Реєстрація</title>
        </Head>
        <div className="flex h-full select-none flex-row">
          <div className="flex w-screen items-center justify-center px-2 duration-300 tablet:w-7/12 laptop:w-5/12">
            <div className="flex flex-col gap-5 rounded-lg px-3 py-2">
              <div>
                <Image className="object-contain" src="/logo.webp" alt="logo" width="100" height="100" />
                <h1 className="text-3xl font-bold">Eviloma ID - Реєстрація</h1>
                <span className="text-sm text-gray-400">Зареєструйтесь в системі Eviloma</span>
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
                  <Input
                    id="email"
                    label="E-mail"
                    placeholder="username@example.com"
                    icon={faAt}
                    register={register}
                    error={errors.email}
                    type="email"
                  />
                  <PasswordInput id="password" label="Пароль" register={register} error={errors.password} />
                  <PasswordInput id="cpassword" label="Пароль" register={register} error={errors.cpassword} />
                  <div className="mb-4 mt-2 flex flex-row items-center justify-end ">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded accent-purple-800"
                      required
                      {...register('terms')}
                    />
                    <label htmlFor="terms" className="ml-2 select-none text-sm font-medium">
                      {`Я приймаю положення та умови EvilomaID [`}
                      <Link href="terms" target="_blank" className="text-purple-800 duration-300 hover:text-purple-600">
                        ?
                      </Link>
                      {']'}
                    </label>
                  </div>
                </div>
                <button
                  className="rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:scale-105 hover:bg-purple-700 disabled:bg-gray-800"
                  type="submit"
                  disabled={isLoading}
                >
                  Зареєструватись
                </button>
              </form>
              <div>
                {'Уже маєте аккаунт? '}
                <Link
                  href={`/login?redirect=${redirect ?? ''}`}
                  className="text-purple-800 duration-300 hover:text-purple-600"
                >
                  Увійти
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
