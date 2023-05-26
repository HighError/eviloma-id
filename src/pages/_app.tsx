import '../styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import useTranslation from 'next-translate/useTranslation';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import getErrorMessage from '@/libs/errorCodes';
import getMessage from '@/libs/getMsgCode';
import useUser from '@/stores/useUser';

const raleway = Raleway({ subsets: ['cyrillic-ext'] });
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t: tNotification } = useTranslation('notifications');
  const updateUser = useUser((state) => state.updateUser);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

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
      <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}>
        <div className="fixed inset-0">
          <Image
            src="/background.webp"
            alt=""
            fill
            className="pointer-events-none -z-10 overflow-hidden object-cover object-center"
          />
        </div>
        <div>
          <main className={raleway.className}>
            <GoogleAnalytics trackPageViews />
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
    </AnimatePresence>
  );
}
