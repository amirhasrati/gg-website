import type { Route } from "./+types/home";
import { About } from "../components/AboutPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Gryphon Gaming!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <About />;
}
