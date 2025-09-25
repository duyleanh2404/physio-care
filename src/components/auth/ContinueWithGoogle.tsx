"use client";

import { Icon } from "@iconify/react";

import { Button } from "../ui/button";

export function ContinueWithGoogle() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2"
    >
      <Icon icon="material-icon-theme:google" className="size-5" />
      <span>Đăng nhập với Google</span>
    </Button>
  );
}
