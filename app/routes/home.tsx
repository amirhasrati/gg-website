import type { Route } from "./+types/home";
import HomePage from "~/components/HomePage";
import { supabase } from "~/lib/supabase";
import { useLoaderData } from "react-router";
import type { Event as GameEvent } from "~/types/event";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Home - Gryphon Gaming" },
		{ name: "description", content: "Gryphon Gaming - University of Guelph's gaming community. View upcoming events, tournaments, and join our inclusive gaming community." },
	];
}

export async function loader({}: Route.LoaderArgs) {
	const { data, error } = await supabase
		.from('events')
		.select('*')
		.order('date', { ascending: true });

	if (error) {
		console.error('Error fetching events:', error);
		throw error;
	}
	
	return { events: (data ?? []) as GameEvent[] };
}

export default function Home() {
	const { events } = useLoaderData<typeof loader>();
	return <HomePage events={events} />;
}
