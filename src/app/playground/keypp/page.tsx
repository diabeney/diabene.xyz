import Keypp from "./_components/keypp";
import Back from "@/components/back";
import { Metadata } from "next";
import ExternalLink from "@/components/external-link";

export const metadata: Metadata = {
  title: "Keypp",
  description: "A minimal, interactive typing speed app",
  openGraph: {
    title: "Keypp",
    description: "A minimal, interactive typing speed app",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/playground/keypp`,
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
    title: "Keypp",
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

export default function KeyppPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Keypp</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        A minimal, interactive typing speed app.
      </p>
      <Keypp />
      <div className="mt-8">
        <small>
          Source code available at{" "}
          <ExternalLink href="https://github.com/diabeney/diabene.xyz/tree/main/src/app/playground/keypp">
            @topia/github.io/keypp
          </ExternalLink>
        </small>
      </div>
    </div>
  );
}
