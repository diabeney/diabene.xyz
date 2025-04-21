import Keypp from "../_components/keypp";
import Back from "@/components/back";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keypp",
  description: "A minimal, interactive typing speed app",
  openGraph: {
    title: "Keypp",
    description: "A minimal, interactive typing speed app",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 800,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
        width: 1200,
        height: 800,
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Keypp",
    description: "A minimal, interactive typing speed app",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-1.png`,
        width: 1200,
        height: 800,
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-2.png`,
        width: 1200,
        height: 800,
      },
    ],
  },
};

export default function KeyppPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Keypp</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        A minimal, interactive typing speed app.
      </p>
      <Keypp />
    </div>
  );
}
