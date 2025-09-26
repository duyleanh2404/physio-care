import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  isHydrated: boolean;
  isVerifyStep: boolean;
  isResetPasswordStep: boolean;

  resetAuth: () => void;
  setHydrated: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  setVerifyStep: (value: boolean) => void;
  setResetPasswordStep: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isHydrated: false,
      isVerifyStep: false,
      isResetPasswordStep: false,

      resetAuth: () =>
        set({
          isLoggedIn: false,
          isVerifyStep: false,
          isResetPasswordStep: false,
        }),
      setLoggedIn: (value) => set({ isLoggedIn: value }),
      setHydrated: (value) => set({ isHydrated: value }),
      setVerifyStep: (value) => set({ isVerifyStep: value }),
      setResetPasswordStep: (value) => set({ isResetPasswordStep: value }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
