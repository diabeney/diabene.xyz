import Link from "next/link";

const playgrounds = [
  {
    name: "Regex",
    path: "/playground/regex",
  },
  {
    name: "Js",
    path: "/playground/js",
  },
  {
    name: "Keypp",
    path: "/playground/keypp",
  },
];

export default function Playground() {
  return (
    <div>
      {playgrounds.map((item) => {
        return (
          <Link key={item.name} href={item.path}>
            <div>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
