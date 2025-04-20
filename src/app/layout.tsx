import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import ThemeProviderWithMeta from "../lib/provider";
import { Analytics } from "@vercel/analytics/react";

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
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Diabene",
  description:
    "A Ghanaian software engineer with interest in user interfaces, backend development, open-source projects, and developer tools. Mostly writing software in TypeScript and Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${ubuntuMono.variable} p-4 ${generalSans.variable} pt-8 md:pt-20 bg-(background:--background) text-(color:--foreground) dark:bg-(background:--background-dark) dark:text-(color:--foreground-dark) antialiased`}
      >
        <Analytics />
        <ThemeProviderWithMeta>
          {/* <Provider> */}
          <div className="max-w-screen-sm mx-auto">
            <Navbar />
            {children}
            <footer className=" text-xs space-y-4 my-10 text-stone-500">
              <div className="w-full relative my-2">
                <hr className="w-full border-stone-200 dark:border-stone-700" />
                <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
                </div>
              </div>
              <div className=" flex items-center mt-6 gap-2 justify-between">
                <p>&copy; {currentYear} Diabene Yaw Addo | All rights reserved</p>
                <a className=" font-extrabold text-amber-500">タウンン</a>
              </div>
            </footer>
          </div>
        </ThemeProviderWithMeta>
      </body>
    </html>
  );
}
