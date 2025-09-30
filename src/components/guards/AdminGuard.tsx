"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/use-auth.store";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isLoggedIn, isHydrated, isAdmin } = useAuthStore();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/");
      return;
    }

    setIsChecking(false);
  }, [isLoggedIn, isHydrated, isAdmin, router]);

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
