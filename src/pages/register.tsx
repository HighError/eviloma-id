import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import * as yup from 'yup';

import Input from '@/components/inputs/Input';
import PasswordInput from '@/components/inputs/Passwordinput';
import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import OnlyForNotAuth from '@/components/routesControllers/OnlyForNotAuth';
import TermsAndConditions from '@/components/TermsAndConditions';
import getErrorMessage from '@/libs/error-codes';

type Inputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export default function Register() {
  const { t } = useTranslation('register');
  const { t: tNotification } = useTranslation('notifications');
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      email: yup.string().required(t('requiredField')).email(t('invalidEmail')),
      username: yup.string().required(t('requiredField')).min(3, t('usernameTooShort')).max(20, t('usernameTooLong')),
      password: yup.string().required(t('requiredField')).min(8, t('passwordTooShort')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('passwordMismatch')),
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
      const res = await axios.post('/api/auth/register', data);
      await mutate('/api/user');
      toast.success(tNotification('loginSuccessful'));
    } catch (err: any) {
      toast.error(tNotification(getErrorMessage(tNotification, err.response?.data as string) ?? 'unknownError'));
      setIsLoading(false);
    }
  };

  return (
    <AnimatedLayout title={t('title')}>
      <OnlyForNotAuth>
        <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-800 p-4 shadow-lg shadow-gray-900 tablet:px-8 tablet:py-6">
          <h2 className="text-center text-3xl font-semibold">{t('titleH3')}</h2>
          <form className="mt-2 flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              label={t('email')}
              placeholder="username@example.com"
              icon={faAt}
              register={register}
              error={errors.email}
            />
            <Input
              id="username"
              label={t('username')}
              placeholder="Username"
              icon={faUser}
              register={register}
              error={errors.username}
            />
            <PasswordInput id="password" label={t('password')} register={register} error={errors.password} />
            <PasswordInput
              id="confirmPassword"
              label={t('confirmPassword')}
              register={register}
              error={errors.confirmPassword}
            />
            <TermsAndConditions />
            <button
              className="mt-3 rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:scale-105 hover:bg-purple-700 disabled:bg-gray-700"
              type="submit"
              disabled={isLoading}
            >
              {t('logIn')}
            </button>
          </form>
          <div className="my-2 h-[1px] w-full rounded-full bg-gray-50" />
          <div className="text-right">
            {t('toLogin1')}
            <Link className="underline duration-300 hover:text-purple-500" href="/login">
              {t('toLogin2')}
            </Link>
          </div>
        </div>
      </OnlyForNotAuth>
    </AnimatedLayout>
  );
}
