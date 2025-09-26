"use client";

import { Suspense } from "react";

import { LoadingSpinner } from "@/components/global/LoadingSpinner";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner className="py-10" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
