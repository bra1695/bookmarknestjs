import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "@/app/providers";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "BookMark - Authentication",
  description: "BookMark Login and Registration",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <div className="flex h-screen justify-center items-center mx-2 md:mx-0">
            <div className="w-full max-w-lg space-y-4 p-6 bg-white dark:bg-teal-900 rounded-lg shadow-md">
              <Logo />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}