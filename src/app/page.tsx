"use client";

import { Suspense } from "react";

import { Header } from "@/components/global/Header";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { LoadingSpinner } from "@/components/global/LoadingSpinner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner
          size={10}
          className="h-screen flex justify-center items-center"
        />
      }
    >
      <AuthGuard>
        <Header />
      </AuthGuard>
    </Suspense>
  );
}
