import JsPlayground from "../_components/js-playground";
import Back from "@/components/back";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truth JS",
  description: "A playground for testing and experimenting with JavaScript code.",
  openGraph: {
    title: "Truth JS",
    description: "A playground for testing and experimenting with JavaScript code.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/playground/js`,
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
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth JS",
    description: "A playground for testing and experimenting with JavaScript code.",
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
export default function JsPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Truth JS</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        A playground for testing and experimenting with JavaScript code.
      </p>
      <JsPlayground />
    </div>
  );
}
