import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AssessmentProvider } from "@/context/assessment-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orion AI — Discover AI Opportunities",
  description:
    "Discover where AI creates value, prioritize initiatives and simulate ROI before investing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <div className="fixed inset-0 grid-bg pointer-events-none" />
        <div className="fixed inset-0 noise pointer-events-none opacity-50" />
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}
