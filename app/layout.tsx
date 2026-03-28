import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "DeepNorth — Dive Into Adventure",
  description:
    "Platform OTA untuk destinasi selam terbaik di Indonesia Utara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${jakarta.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
