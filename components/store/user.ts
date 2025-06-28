'use client';

import { create } from 'zustand';

// Define the Zustand store
const useCurrentUser = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/api/current-user', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the current user.');
      }

      const user = await response.json();
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCurrentUser;
