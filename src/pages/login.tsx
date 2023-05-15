import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import * as cookie from 'cookie';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useReCaptcha } from 'next-recaptcha-v3';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import * as yup from 'yup';

import Input from '@/components/inputs/Input';
import PasswordInput from '@/components/inputs/Passwordinput';
import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import OnlyForNotAuth from '@/components/routesControllers/OnlyForNotAuth';
import SocialButton from '@/components/SocialButton';
import getErrorMessage from '@/libs/error-codes';
import getMessage from '@/libs/msg-code';
import useLoading from '@/stores/useLoading';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { isLoading, setIsLoading } = useLoading();
  const { t } = useTranslation('login');
  const { t: tNotification } = useTranslation('notifications');
  const { executeRecaptcha } = useReCaptcha();

  const schema = yup
    .object({
      username: yup.string().required(t('requiredField')),
      password: yup.string().required(t('requiredField')),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const captcha = await executeRecaptcha('form_submit');
      await axios.post('/api/auth/login', { ...data, captcha });
      await mutate('/api/user');
      setIsLoading(false);
      toast.success(tNotification('loginSuccessful'));
    } catch (err) {
      toast.error(
        tNotification(getErrorMessage(tNotification, (err as AxiosError).response?.data as string) ?? 'unknownError')
      );
      setIsLoading(false);
    }
  };

  return (
    <AnimatedLayout title={t('title')}>
      <OnlyForNotAuth>
        <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-900 p-4 shadow-lg shadow-black tablet:px-8 tablet:py-6">
          <h2 className="text-center text-3xl font-semibold">{t('titleH3')}</h2>
          <form className="mt-2 flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="username"
              label={t('username')}
              placeholder="Username"
              icon={faUser}
              register={register}
              error={errors.username}
            />
            <PasswordInput id="password" label={t('password')} register={register} error={errors.password} />
            <button
              className="mt-3 rounded-lg bg-purple-800 px-3 py-2 duration-300 enabled:hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-800"
              type="submit"
              disabled={isLoading}
            >
              {t('logIn')}
            </button>
          </form>
          <div className="my-2 h-0.5 w-full rounded-full bg-gray-50" />
          <div className="grid grid-cols-6 gap-3">
            <SocialButton isLoading={true} onClick={() => Router.push('#')} icon={faGoogle} />
            <SocialButton isLoading={isLoading} onClick={() => Router.push('/api/auth/discord')} icon={faDiscord} />
          </div>
          <div className="my-2 h-0.5 w-full rounded-full bg-gray-50" />
          <div className="text-right">
            {t('toRegister1')}
            <Link className="underline duration-300 hover:text-purple-500" href="/register">
              {t('toRegister2')}
            </Link>
          </div>
        </div>
      </OnlyForNotAuth>
    </AnimatedLayout>
  );
}
