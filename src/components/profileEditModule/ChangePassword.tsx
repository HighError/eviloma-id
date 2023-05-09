import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';

import { UserContext } from '@/contexts/userContext';
import getErrorMessage from '@/libs/error-codes';

interface IProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IData {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

export default function ChangePassword({ isLoading, setIsLoading }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { t } = useTranslation('edit');
  const { t: tNotification } = useTranslation('notifications');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IData>();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    reset();
  }

  const Submit: SubmitHandler<IData> = async (data) => {
    setIsLoading(true);
    if (data.oldPass === data.newPass) {
      toast.error(tNotification('oldPassCantMatchNewPass'));
      setIsLoading(false);
      return;
    }
    if (data.newPass !== data.confirmPass) {
      toast.error(tNotification('mismatchPassword'));
      setIsLoading(false);
      return;
    }
    if (data.newPass.length < 8) {
      toast.error(tNotification('passwordTooShort'));
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/profile/password', { ...data });
      await mutate('/api/user');
      toast.success(tNotification('successfullyChangedPassword'));
      closeModal();
    } catch (err: any) {
      toast.error(tNotification(getErrorMessage(tNotification, err.response?.data as string) ?? 'unknownError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={openModal}
        className="rounded-md bg-purple-800 px-4 py-2 font-medium duration-300 hover:bg-purple-700"
      >
        {t('buttonEditPassword')}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">{t('editPasswordTitle')}</Dialog.Title>
                  <form onSubmit={handleSubmit(Submit)}>
                    <div className="mt-2">
                      <label className="text-sm">
                        {t('enterOldPassword')}:
                        <input
                          id="oldPass"
                          type="password"
                          className="w-full rounded-lg border-2 border-gray-50 bg-[transparent] px-3 py-2"
                          {...register('oldPass', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="text-sm">
                        {t('enterNewPassword')}:
                        <input
                          id="newPass"
                          type="password"
                          className="w-full rounded-lg border-2 border-gray-50 bg-[transparent] px-3 py-2"
                          {...register('newPass', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="text-sm">
                        {t('enterConfirmPassword')}:
                        <input
                          id="confirmPass"
                          type="password"
                          className="w-full rounded-lg border-2 border-gray-50 bg-[transparent] px-3 py-2"
                          {...register('confirmPass', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="mt-4 flex flex-row-reverse gap-4">
                      <button
                        type="submit"
                        className="justify-center rounded-md bg-purple-800 px-4 py-2 text-sm font-medium duration-300 hover:bg-purple-700"
                      >
                        {t('buttonEdit')}
                      </button>
                      <button
                        type="button"
                        className="justify-center rounded-md bg-red-800 px-4 py-2 text-sm font-medium duration-300 hover:bg-red-700"
                        onClick={closeModal}
                      >
                        {t('buttonCancel')}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
