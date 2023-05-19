import { NextPage } from 'next';
import React, { useEffect } from 'react';

import Loading from '@/components/Loading';
import useUser from '@/stores/useUser';

const withAuthMiddleware = (Component: NextPage) => {
  const WithAuth: NextPage = (props) => {
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (!user && !isLoading) {
        window.location.replace('/login');
      }
    }, [isLoading, user]);

    return isLoading ? <Loading /> : <Component {...props} />;
  };

  return WithAuth;
};

export default withAuthMiddleware;
