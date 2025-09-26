"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useAuthStore } from "@/store/use-auth.store";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";

export default function Page() {
  const router = useRouter();

  const { isResetPasswordStep } = useAuthStore();

  useEffect(() => {
    if (!isResetPasswordStep) {
      router.replace("/login");
    }
  }, [isResetPasswordStep, router]);

  if (!isResetPasswordStep) {
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
      <ResetPasswordForm />
    </Suspense>
  );
}
