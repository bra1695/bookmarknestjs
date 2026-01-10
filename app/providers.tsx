"use client";

import { ThemeProvider } from "next-themes";
import { ThemeFontProvider } from "@/hooks/use-theme-font";
import { AuthProvider } from "@/hooks/use-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
    >
      <ThemeFontProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeFontProvider>
    </ThemeProvider>
  );
}
