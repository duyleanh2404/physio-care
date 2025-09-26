"use client";

import { Suspense } from "react";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";

export default function Page() {
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
