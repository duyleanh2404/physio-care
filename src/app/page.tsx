"use client";

import { Suspense } from "react";

import { AuthGuard } from "@/components/guards/AuthGuard";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner className="h-screen" />}>
      <AuthGuard>Home</AuthGuard>
    </Suspense>
  );
}
