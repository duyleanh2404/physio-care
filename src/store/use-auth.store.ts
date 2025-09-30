import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  isHydrated: boolean;
  isVerifyStep: boolean;
  isResetPasswordStep: boolean;

  resetAuth: () => void;
  setIsAdmin: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  setVerifyStep: (value: boolean) => void;
  setResetPasswordStep: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      isLoggedIn: false,
      isHydrated: false,
      isVerifyStep: false,
      isResetPasswordStep: false,

      resetAuth: () =>
        set({
          isAdmin: false,
          isLoggedIn: false,
          isVerifyStep: false,
          isResetPasswordStep: false,
        }),
      setIsAdmin: (value) => set({ isAdmin: value }),
      setLoggedIn: (value) => set({ isLoggedIn: value }),
      setHydrated: (value) => set({ isHydrated: value }),
      setVerifyStep: (value) => set({ isVerifyStep: value }),
      setResetPasswordStep: (value) => set({ isResetPasswordStep: value }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
