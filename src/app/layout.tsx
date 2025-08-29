import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Shaadi Seating Chart - Wedding Celebration",
  description: "Find your seat for our beautiful Shaadi celebration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
