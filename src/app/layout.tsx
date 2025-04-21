import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import ThemeProviderWithMeta from "../lib/provider";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";

const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-paragraph",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Diabene",
    default: "Diabene",
  },
  description:
    "A Ghanaian software engineer with interest in user interfaces, backend development, open-source projects, and developer tools. Mostly writing software in TypeScript and Go.",
  keywords: ["Software Engineer", "Web Developer", "Open Source"],
  authors: [{ name: "Diabene Yaw Addo" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://diabene.xyz"),
  openGraph: {
    title: "Diabene Yaw Addo",
    description:
      "JavaScript is the truth | Software Engineer, highly skilled in user interfaces, backend development, open-source projects, and developer tools.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Diabene Portfolio",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 1000,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
        width: 1200,
        height: 1000,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diabene Yaw Addo",
    description: "JavaScript is the truth | Software Engineer",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 1000,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
        width: 1200,
        height: 1000,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${satoshi.variable} ${ubuntuMono.variable} p-4 ${generalSans.variable} pt-8 md:pt-20 bg-(background:--background) text-(color:--foreground) dark:bg-(background:--background-dark) dark:text-(color:--foreground-dark) antialiased`}
      >
        <Analytics />
        <ThemeProviderWithMeta>
          <div className="max-w-screen-sm  mx-auto">
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-amber-500 focus:text-white focus:z-50 focus-visible:focus:ring-2 focus-visible:focus:ring-white"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="content" tabIndex={-1} className="focus:outline-none">
              {children}
            </main>
            <footer className="text-xs space-y-4 my-10 text-stone-500" role="contentinfo">
              <div className="w-full relative my-2">
                <hr className="w-full border-stone-200 dark:border-stone-700" aria-hidden="true" />
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
                </div>
              </div>
              <div className="flex items-center mt-6 gap-2 justify-between">
                <p>&copy; {currentYear} Diabene Yaw Addo | All rights reserved</p>
                <Link
                  className="font-extrabold text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
                  href="/"
                  aria-label="Home"
                >
                  タウンン
                </Link>
              </div>
            </footer>
          </div>
        </ThemeProviderWithMeta>
      </body>
    </html>
  );
}
