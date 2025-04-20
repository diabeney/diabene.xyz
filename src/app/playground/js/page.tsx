import ExternalLink from "@/components/external-link";
import JsPlayground from "../_components/js-playground";
import Back from "@/components/back";

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
