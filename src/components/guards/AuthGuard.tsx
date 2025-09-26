"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { LoadingSpinner } from "../global/LoadingSpinner";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      async function setTokens() {
        try {
          const res = await fetch("/api/auth/set-tokens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken, refreshToken }),
          });

          if (!res.ok) throw new Error("Failed to set tokens");

          router.replace("/");
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
  }, [searchParams, router]);

  if (isLoading) {
    return <LoadingSpinner className="h-screen" />;
  }

  return <>{children}</>;
}
