import Keypp from "../_components/typing";
import Back from "@/components/back";

export default function KeyppPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Keypp</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">A minimal, interactive typing speed app.</p>
      <Keypp />
    </div>
  );
}
