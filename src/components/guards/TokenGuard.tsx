"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/store/use-auth.store";

import { LoadingSpinner } from "../global/LoadingSpinner";

type TokenGuardProps = {
  children: ReactNode;
};

export function TokenGuard({ children }: TokenGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setLoggedIn } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      async function setTokens() {
        try {
          const res = await fetch("/api/auth/set-tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken, refreshToken }),
          });

          if (!res.ok) throw new Error("Failed to set tokens");

          setLoggedIn(true);

          const url = new URL(window.location.href);
          url.searchParams.delete("accessToken");
          url.searchParams.delete("refreshToken");

          router.replace(url.pathname + url.search);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      setTokens();
    } else {
      setIsLoading(false);
    }
  }, [searchParams, router, setLoggedIn]);

  if (isLoading) {
    return (
      <LoadingSpinner
        size={10}
        className="h-screen flex justify-center items-center"
      />
    );
  }

  return <>{children}</>;
}
