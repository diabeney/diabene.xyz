import Back from "@/components/back";
import Regfatto from "../_components/regfatto";
import ExternalLink from "@/components/external-link";
export default function RegexPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Regfatto</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        Inspired by <ExternalLink href="https://regex101.com/">regex101.com</ExternalLink>, regular expressions explanations made easy.
      </p>
      <Regfatto />
    </div>
  );
}
