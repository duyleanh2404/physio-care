"use client";

import { Suspense } from "react";

import { TokenGuard } from "@/components/guards/TokenGuard";

import { Header } from "@/components/global/Header";
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
      <TokenGuard>
        <Header />
      </TokenGuard>
    </Suspense>
  );
}
