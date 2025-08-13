import type { Route } from "./+types/home";
import { About } from "../components/AboutPage";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "About - Gryphon Gaming" },
		{ name: "description", content: "Gryphon Gaming at University of Guelph - welcoming gaming community for all skill levels. Tournaments, game nights, and campus gaming events." },
	];
}

export default function Home() {
	return <About />;
}
