import axios from 'axios';
import { create } from 'zustand';

import { IUser } from '@/models/User';

interface Store {
  user: IUser | null;
  error: boolean;
  isLoading: boolean;
  discord: {
    error: boolean;
    data: string;
  };
  updateUser: () => Promise<void>;
}

const useUser = create<Store>((set) => ({
  user: null,
  error: false,
  isLoading: true,
  discord: {
    error: false,
    data: '',
  },
  updateUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get('/api/user');
      const discord = await updateDiscord((data.user as IUser).discord);
      console.log(discord);
      set({ user: data.user as IUser, error: false, isLoading: false, discord });
    } catch (err) {
      set({ user: null, error: true, isLoading: false });
    }
  },
}));

async function updateDiscord(discord: string | null) {
  if (!discord) {
    return {
      error: false,
      data: null,
    };
  }
  try {
    const res = await axios.get(`https://discordlookup.mesavirep.xyz/v1/user/${discord}`);
    return {
      error: false,
      data: res.data.tag ?? null,
    };
  } catch (err) {
    return {
      error: true,
      data: '',
    };
  }
}

export default useUser;
