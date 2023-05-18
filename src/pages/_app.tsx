import '../styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Raleway } from 'next/font/google';
import { useRouter } from 'next/router';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import UserProvider from '@/contexts/userContext';
import getErrorMessage from '@/libs/error-codes';
import getMessage from '@/libs/msg-code';

const raleway = Raleway({ subsets: ['cyrillic-ext'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t: tNotification } = useTranslation('notifications');
  useEffect(() => {
    const { query } = router;
    if (query.msg) {
      toast.success(getMessage(tNotification, query.msg as string));
    }
    if (query.err) {
      toast.error(getErrorMessage(tNotification, query.err as string));
    }
  }, [router, tNotification]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <UserProvider>
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}>
          <div>
            <main className={raleway.className}>
              <Component {...pageProps} />
            </main>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 5000,
                style: {
                  background: '#1e1e1e',
                  color: '#e7e7e7',
                },
              }}
            />
          </div>
        </ReCaptchaProvider>
      </UserProvider>
    </AnimatePresence>
  );
}
