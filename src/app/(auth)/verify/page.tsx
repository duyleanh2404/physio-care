"use client";

import { Suspense } from "react";

import { VerifyForm } from "@/components/auth/verify/VerifyForm";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner className="py-10" />}>
      <VerifyForm />
    </Suspense>
  );
}
