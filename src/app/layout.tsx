import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Mono } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "800"], // Add "800" here for extrabold
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights for your UI/Mono font too
});

export const metadata: Metadata = {
  title: "Codeforces Bingo | Code Competition",
  description: "Solve competitive programming problems and complete bingo lines to climb the leaderboard.",
  keywords: ["codeforces", "bingo", "competitive programming", "coding contest"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
