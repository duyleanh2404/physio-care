"use client";

import { Suspense } from "react";

import { VerifyForm } from "@/components/auth/verify/VerifyForm";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

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
      <VerifyForm />
    </Suspense>
  );
}
