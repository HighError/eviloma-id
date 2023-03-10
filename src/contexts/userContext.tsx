import axios, { AxiosError } from 'axios';
import React, { createContext, ReactNode, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

interface IProps {
  children: ReactNode;
}

interface IUserContext {
  user?: {
    id: string;
    username: string;
    email: string;
    private: boolean;
  };
  error?: AxiosError;
  isLoading: boolean;
}

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      return { user: data?.user || null };
    });

export const UserContext = createContext<IUserContext>({ isLoading: true });

function UserProvider({ children }: IProps) {
  const { data, error } = useSWRImmutable('/api/user', fetcher);
  const user = data?.user;
  const isLoading = !(data || error);

  const value = useMemo(
    () => ({
      user,
      error,
      isLoading,
    }),
    [user, error, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
