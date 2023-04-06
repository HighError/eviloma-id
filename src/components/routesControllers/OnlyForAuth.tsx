import Router from 'next/router';
import React, { ReactNode, useContext } from 'react';

import { UserContext } from '@/contexts/userContext';

import Loading from '../Loading';

const OnlyForAuth = ({ children }: { children: ReactNode }) => {
  const { user, error, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || error) {
    Router.push('/login');
  }

  return <>{children}</>;
};

export default OnlyForAuth;
