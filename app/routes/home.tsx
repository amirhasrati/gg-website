import type { Route } from "./+types/home";
import HomePage from "~/components/HomePage";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Home - Gryphon Gaming" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return <HomePage />;
}
