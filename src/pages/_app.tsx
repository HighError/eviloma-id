import '../styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Raleway } from 'next/font/google';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import UserProvider from '../contexts/userContext';

const raleway = Raleway({ subsets: ['cyrillic-ext'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <UserProvider>
        <div>
          <main className={raleway.className}>
            <Component {...pageProps} />
          </main>
          <Toaster
            position="top-right"
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
      </UserProvider>
    </AnimatePresence>
  );
}
