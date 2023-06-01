import { yupResolver } from '@hookform/resolvers/yup';
import accountIcon from '@iconify/icons-mdi/account';
import { AxiosError } from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { useReCaptcha } from 'next-recaptcha-v3';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import Input from '@/components/inputs/Input';
import PasswordInput from '@/components/inputs/Passwordinput';
import Layout from '@/components/layouts/Layout';
import SocialButton from '@/components/SocialButton';
import axios from '@/libs/axios';
import getErrorMessage from '@/libs/errorCodes';
import withoutAuthMiddleware from '@/middlewares/client/withoutAuth';
import useLoading from '@/stores/useLoading';
import useUser from '@/stores/useUser';

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const { isLoading, setIsLoading } = useLoading();
  const { t } = useTranslation('login');
  const { t: tNotification } = useTranslation('notifications');
  const { executeRecaptcha } = useReCaptcha();
  const updateUser = useUser((state) => state.updateUser);

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
      await updateUser();
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
    <Layout title={t('title')}>
      <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-ctp-surface0 p-4 shadow-lg shadow-black tablet:px-8 tablet:py-6">
        <h2 className="text-center text-3xl font-semibold">{t('titleH3')}</h2>
        <form className="mt-2 flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="username"
            label={t('username')}
            placeholder="Username"
            icon={accountIcon}
            register={register}
            error={errors.username}
          />
          <PasswordInput id="password" label={t('password')} register={register} error={errors.password} />
          <button
            className="mt-3 flex w-full flex-row items-center justify-center gap-3 rounded-lg bg-ctp-mauve px-4 py-2 text-ctp-base duration-300 hover:bg-ctp-pink enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-ctp-crust disabled:text-ctp-subtext0"
            type="submit"
            disabled={isLoading}
          >
            {t('logIn')}
          </button>
        </form>
        <div className="my-2 h-0.5 w-full rounded-full bg-ctp-overlay0" />
        <div className="grid grid-cols-6 gap-3">
          <SocialButton isLoading={isLoading} onClick={() => Router.push('/api/auth/google')} icon="bxl:google" />
          <SocialButton isLoading={isLoading} onClick={() => Router.push('/api/auth/discord')} icon="bxl:discord-alt" />
        </div>
        <div className="my-2 h-0.5 w-full rounded-full bg-ctp-overlay0" />
        <div className="text-right">
          {t('toRegister1')}
          <Link className="underline duration-300 hover:text-ctp-mauve" href="/register">
            {t('toRegister2')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default withoutAuthMiddleware(Login);
