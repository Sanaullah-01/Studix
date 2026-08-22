"use client";

import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button variant="outline" onClick={() => logoutAction()}>
      Log out
    </Button>
  );
}
