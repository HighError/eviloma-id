import { create } from 'zustand';

interface Store {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoading = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useLoading;
