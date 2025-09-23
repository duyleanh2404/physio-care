import { Icon } from "@iconify/react";

import { Button } from "../ui/button";

export function ContinueWithGoogle() {
  return (
    <Button size="lg" variant="outline" className="w-full">
      <Icon icon="material-icon-theme:google" className="size-5" />
      <p>Đăng nhập với Google</p>
    </Button>
  );
}
