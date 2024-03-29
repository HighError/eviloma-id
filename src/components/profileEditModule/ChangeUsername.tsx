import { Dialog, Transition } from '@headlessui/react';
import accountEdit from '@iconify/icons-mdi/account-edit';
import leadPencil from '@iconify/icons-mdi/lead-pencil';
import { Icon } from '@iconify/react';
import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import axios from '@/libs/axios';
import getErrorMessage from '@/libs/errorCodes';
import useLoading from '@/stores/useLoading';
import useUser from '@/stores/useUser';

interface IData {
  username: string;
}

export default function ChangeUsername() {
  const { isLoading, setIsLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const { user, updateUser } = useUser();
  const { t } = useTranslation('edit');
  const { t: tNotification } = useTranslation('notifications');

  const { register, handleSubmit, reset } = useForm<IData>();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    reset();
  }

  const Submit: SubmitHandler<IData> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/profile/username', { ...data });
      await updateUser();
      toast.success(tNotification('successfulChangeUsername'));
      closeModal();
    } catch (err) {
      toast.error(
        tNotification(getErrorMessage(tNotification, (err as AxiosError).response?.data as string) ?? 'unknownError')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-lg border-2 border-ctp-surface2 bg-ctp-surface1 px-3 py-5">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-ctp-overlay0">
          <Icon icon={accountEdit} className="m-auto h-full text-center text-3xl text-ctp-mauve" />
        </div>
        <button
          type="button"
          disabled={isLoading}
          onClick={openModal}
          className="mt-auto flex w-full flex-row items-center justify-center gap-3 rounded-lg bg-ctp-mauve px-4 py-2 text-ctp-base duration-300 hover:bg-ctp-pink enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-ctp-crust disabled:text-ctp-subtext0"
        >
          <Icon icon={leadPencil} className="text-xl" />
          {t('buttonEditUsername')}
        </button>
      </div>

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
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3">{t('editUsernameTitle')}</Dialog.Title>
                  <p className="text-sm">
                    {t('currentUsername')}: <span className="font-medium">{user?.username ?? ''}</span>
                  </p>
                  <form onSubmit={handleSubmit(Submit)}>
                    <div className="mt-2">
                      <label className="text-sm">
                        {t('enterNewUsername')}:
                        <input
                          id="username"
                          type="text"
                          required
                          min={3}
                          max={20}
                          className="w-full rounded-lg border-2 border-gray-700 bg-gray-800 px-3 py-2 outline-none duration-300 focus-within:border-purple-800"
                          {...register('username', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="mt-4 flex flex-row-reverse gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="justify-center rounded-md bg-purple-800 px-4 py-2 text-sm font-medium duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-800"
                      >
                        {t('buttonEdit')}
                      </button>
                      <button
                        type="button"
                        className="justify-center rounded-md bg-red-800 px-4 py-2 text-sm font-medium duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-800"
                        onClick={closeModal}
                        disabled={isLoading}
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
