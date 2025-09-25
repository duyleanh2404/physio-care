"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
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
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
