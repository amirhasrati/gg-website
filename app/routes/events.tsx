import type { Route } from "./+types/home";
import { Events } from "../components/EventsPage";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Events - Gryphon Gaming" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return <Events />;
}
