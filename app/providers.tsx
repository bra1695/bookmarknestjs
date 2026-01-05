"use client";

import { ThemeProvider } from "next-themes";
import { ThemeFontProvider } from "@/hooks/use-theme-font";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <ThemeFontProvider>
        {children}
      </ThemeFontProvider>
    </ThemeProvider>
  );
}
