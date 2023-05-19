import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useReCaptcha } from 'next-recaptcha-v3';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import Input from '@/components/inputs/Input';
import PasswordInput from '@/components/inputs/Passwordinput';
import AnimatedLayout from '@/components/layouts/AnimatedLayout';
import TermsAndConditions from '@/components/TermsAndConditions';
import getErrorMessage from '@/libs/error-codes';
import withoutAuthMiddleware from '@/middlewares/client/withoutAuth';
import useLoading from '@/stores/useLoading';
import useUser from '@/stores/useUser';

type Inputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const { t } = useTranslation('register');
  const { t: tNotification } = useTranslation('notifications');
  const { isLoading, setIsLoading } = useLoading();
  const { executeRecaptcha } = useReCaptcha();
  const updateUser = useUser((state) => state.updateUser);

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
      const captcha = await executeRecaptcha('form_submit');
      await axios.post('/api/auth/register', { ...data, captcha });
      await updateUser();
      toast.success(tNotification('loginSuccessful'));
    } catch (err) {
      toast.error(
        tNotification(getErrorMessage(tNotification, (err as AxiosError).response?.data as string) ?? 'unknownError')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedLayout title={t('title')}>
      <div className="absolute left-1/2 top-1/2 flex w-min -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-gray-900 p-4 shadow-lg shadow-black tablet:px-8 tablet:py-6">
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
            className="mt-3 rounded-lg bg-purple-800 px-3 py-2 duration-300 hover:bg-purple-700 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-700"
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
    </AnimatedLayout>
  );
}

export default withoutAuthMiddleware(Register);
