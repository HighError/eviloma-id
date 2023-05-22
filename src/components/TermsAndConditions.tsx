import { Dialog, Transition } from '@headlessui/react';
import Markdown from 'markdown-to-jsx';
import useTranslation from 'next-translate/useTranslation';
import React, { createRef, Fragment, ReactNode, useEffect, useState } from 'react';

import terms from '@/TermsAndConditions.md';

interface IProps {
  children: ReactNode;
}

const MyParagraph = ({ children, ...props }: IProps) => <div {...props}>{children}</div>;

export default function TermsAndConditions() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('register');
  const refContainer = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (refContainer && refContainer.current && isOpen) {
        refContainer.current.scrollTop = 0;
      }
    }),
      300;
  }, [isOpen, refContainer]);

  return (
    <>
      <label className="mt-2 text-center text-sm">
        <input type="checkbox" className="mr-1" id="terms" required />
        {t('accept')} [
        <button
          className="inline text-xl text-purple-400 duration-300 hover:text-purple-300"
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          ?
        </button>
        ]
      </label>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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

          <div className="fixed inset-0 overflow-y-auto" ref={refContainer}>
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900 p-6 text-left align-middle shadow-2xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6">
                    {t('termsAndConditionsTitle')}
                  </Dialog.Title>
                  <Markdown
                    className="overflow-auto p-5"
                    options={{
                      overrides: {
                        h1: {
                          component: MyParagraph,
                          props: {
                            className: 'text-3xl font-bold w-full flex flex-row items-center justify-center mb-5',
                          },
                        },
                        h2: {
                          component: MyParagraph,
                          props: {
                            className: 'text-2xl mt-3 mb-1 font-semibold',
                          },
                        },
                        p: {
                          component: MyParagraph,
                          props: {
                            className: 'mb-2 text-shadow-md',
                          },
                        },
                        a: {
                          component: MyParagraph,
                          props: {
                            className: 'text-purple-400 hover:text-purple-300 duration-300 inline cursor-pointer',
                          },
                        },
                      },
                    }}
                  >
                    {terms}
                  </Markdown>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-purple-800 px-4 py-2 text-sm font-medium duration-300 hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('closeTermsAndConditionsButton')}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
