"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

import { Hint } from "./Hint";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className = "size-8" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Hint content="Giao diện">
      <Button
        size="icon"
        variant="outline"
        onClick={toggleTheme}
        className={className}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </Button>
    </Hint>
  );
}
