import { faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import Router, { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import * as yup from 'yup';

import AnimatedLayout from '@/components/AnimatedLayout';
import Input from '@/components/inputs/Input';
import PasswordInput from '@/components/inputs/Passwordinput';
import OnlyForNotAuth from '@/components/routesControllers/OnlyForNotAuth';
import SocialButton from '@/components/SocialButton';
import getCallbackErrorMessage from '@/libs/callback-errors';
import getExternalServiceLink from '@/libs/external-services';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation('login');
  const { t: tNotification } = useTranslation('notification');
  const [isLoading, setIsLoading] = useState(false);
  const redirect = router.query['redirect'];
  let callback_error = router.query['callback_error'];

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/auth/login', data)
      .then(() => {
        toast.success(tNotification('loginSuccessful'));
        if (redirect) {
          const link = encodeURI(getExternalServiceLink(redirect as string));
          router.push(link);
        }
        mutate('/api/user');
      })
      .catch((err: AxiosError) => toast.error((err.response?.data as string) ?? tNotification('unknownError')));
    setIsLoading(false);
  };

  useEffect(() => {
    if (callback_error) {
      toast.error(getCallbackErrorMessage(callback_error as string));
      callback_error = undefined;
    }
  }, [callback_error]);

  return (
    <AnimatedLayout title={t('title')}>
      <OnlyForNotAuth>
        <div className="relative left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-800 p-4 shadow-lg shadow-gray-900 tablet:px-8 tablet:py-6">
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
              className="mt-3 rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:scale-105 hover:bg-purple-700 disabled:bg-gray-700"
              type="submit"
              disabled={isLoading}
            >
              {t('logIn')}
            </button>
          </form>
          <div className="my-2 h-[1px] w-full rounded-full bg-gray-50" />
          <div className="grid grid-cols-6 gap-3">
            <SocialButton isLoading={true} onClick={() => Router.push('#')} icon={faGoogle} />
            <SocialButton isLoading={isLoading} onClick={() => Router.push('/api/auth/discord')} icon={faDiscord} />
          </div>
        </div>
      </OnlyForNotAuth>
    </AnimatedLayout>
  );
}
