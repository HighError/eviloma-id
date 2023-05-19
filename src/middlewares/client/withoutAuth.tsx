import { NextPage } from 'next';
import React, { useEffect } from 'react';

import Loading from '@/components/Loading';
import useUser from '@/stores/useUser';

const withoutAuthMiddleware = (Component: NextPage) => {
  const WithoutAuth: NextPage = (props) => {
    const { user, isLoading } = useUser();

    useEffect(() => {
      if (user && !isLoading) {
        window.location.replace('/');
      }
    }, [isLoading, user]);

    return isLoading ? <Loading /> : <Component {...props} />;
  };

  return WithoutAuth;
};

export default withoutAuthMiddleware;
