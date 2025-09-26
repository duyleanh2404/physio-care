"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/use-auth.store";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isLoggedIn, isHydrated } = useAuthStore();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    if (isLoggedIn) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
  }, [isLoggedIn, isHydrated, router]);

  if (!isHydrated || isChecking) {
    return (
      <LoadingSpinner
        size={8}
        className="h-screen flex justify-center items-center"
      />
    );
  }

  return <>{children}</>;
}
