import { motion } from 'framer-motion';
import Head from 'next/head';
import React, { ReactNode } from 'react';

const Layout = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.div
        className="h-fulldvh"
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

export default Layout;
