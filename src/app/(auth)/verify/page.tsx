"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useAuthStore } from "@/store/use-auth.store";

import { VerifyForm } from "@/components/auth/verify/VerifyForm";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export default function Page() {
  const router = useRouter();

  const { isVerifyStep } = useAuthStore();

  useEffect(() => {
    if (!isVerifyStep) {
      router.replace("/login");
    }
  }, [isVerifyStep, router]);

  if (!isVerifyStep) {
    return (
      <LoadingSpinner
        size={8}
        className="flex justify-center items-center py-10"
      />
    );
  }

  return (
    <Suspense
      fallback={
        <LoadingSpinner
          size={10}
          className="flex justify-center items-center py-10"
        />
      }
    >
      <VerifyForm />
    </Suspense>
  );
}
