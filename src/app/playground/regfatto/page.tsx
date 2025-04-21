import Back from "@/components/back";
import Regfatto from "./_components/regfatto";
import ExternalLink from "@/components/external-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regfatto",
  description: "A minimal, interactive typing speed app",
  openGraph: {
    title: "Regfatto",
    description: "A minimal, interactive typing speed app",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/playground/regfatto`,
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
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regfatto",
    description: "A minimal, interactive typing speed app",
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
export default function RegexPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Regfatto</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        Inspired by <ExternalLink href="https://regex101.com/">regex101.com</ExternalLink>, regular
        expressions explanations made easy.
      </p>
      <Regfatto />
    </div>
  );
}
