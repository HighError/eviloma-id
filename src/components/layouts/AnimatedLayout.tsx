import { motion } from 'framer-motion';
import Head from 'next/head';
import React, { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
  title: string;
  enableBackground?: boolean;
}

const AnimatedLayout = ({ children, title, enableBackground }: IProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.div
        className={`min-h-[100dvh] ${enableBackground && 'bg-gray-900'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default AnimatedLayout;
