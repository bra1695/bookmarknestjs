import type { Metadata } from "next";
import "../../globals.css";
import { Providers } from "@/app/providers";


export const metadata: Metadata = {
  title: "BookMark",
  description: "BookMark Dashboard",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
