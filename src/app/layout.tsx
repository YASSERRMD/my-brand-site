import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Mohamed Yasser — Government Solution Architect",
  description:
    "Mohamed Yasser: Government Solution Architect, Emerging Technology Strategist, AI Systems Architect, and Digital Transformation Leader with 20+ years of experience.",
  robots: "index, follow",
  openGraph: {
    title: "Mohamed Yasser — Government Solution Architect",
    description:
      "Entering the mind of an architect designing the future of government, AI, and intelligent cities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Yasser — Government Solution Architect",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
