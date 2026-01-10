"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Font = "geist" | "inter" | "roboto";

interface ThemeFontContextType {
  font: Font;
  setFont: (font: Font) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

const ThemeFontContext = createContext<ThemeFontContextType | undefined>(undefined);

export function ThemeFontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<Font>("geist");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedFont = localStorage.getItem("font") as Font;
    if (savedFont) setFont(savedFont);
  }, []);

  const handleSetFont = (newFont: Font) => {
    setFont(newFont);
    localStorage.setItem("font", newFont);
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, "")
      .concat(` font-${newFont}`);
  };

  return (
    <ThemeFontContext.Provider value={{ font, setFont: handleSetFont, theme, setTheme }}>
      {children}
    </ThemeFontContext.Provider>
  );
}

export const useThemeFont = () => {
  const context = useContext(ThemeFontContext);
  if (!context) throw new Error("useThemeFont must be used within ThemeFontProvider");
  return context;
};