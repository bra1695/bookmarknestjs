"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import logoLight from "@/public/images/logo-light-theme.svg";
import logoDark from "@/public/images/logo-dark-theme.svg";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? logoDark : logoLight}
      alt="BookMark Logo"
      priority
    />
  );
}
