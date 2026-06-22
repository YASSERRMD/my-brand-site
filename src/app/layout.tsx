import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://yasserrmd.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohamed Yasser — Government Solution Architect",
    template: "%s | Mohamed Yasser",
  },
  description:
    "Mohamed Yasser: Government Solution Architect, Emerging Technology Strategist, AI Systems Architect, and Digital Transformation Leader with 20+ years of experience shaping intelligent governments and smart cities.",
  keywords: [
    "Mohamed Yasser",
    "Government Solution Architect",
    "AI Systems Architect",
    "Digital Transformation",
    "Smart Cities",
    "Enterprise Architecture",
    "Agentic AI",
    "GenAI",
    "Computer Vision",
    "Government Technology",
  ],
  authors: [{ name: "Mohamed Yasser", url: SITE_URL }],
  creator: "Mohamed Yasser",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mohamed Yasser",
    title: "Mohamed Yasser — Government Solution Architect",
    description:
      "Entering the mind of an architect designing the future of government, AI, and intelligent cities.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Yasser — Government Solution Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Yasser — Government Solution Architect",
    description:
      "Entering the mind of an architect designing the future of government, AI, and intelligent cities.",
    images: ["/assets/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
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
