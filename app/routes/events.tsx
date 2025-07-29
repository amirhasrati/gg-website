import type { Route } from "./+types/home";
import { Events } from "../components/EventsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gryphon Gaming Events!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Events />;
}
