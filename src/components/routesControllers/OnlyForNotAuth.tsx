import Router from 'next/router';
import React, { ReactNode, useContext } from 'react';

import { UserContext } from '@/contexts/userContext';

import Loading from '../Loading';

const OnlyForNotAuth = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    Router.push('/');
  }

  return <>{children}</>;
};

export default OnlyForNotAuth;
