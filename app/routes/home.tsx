import type { Route } from "./+types/home";
import HomePage from "~/components/HomePage";
import { supabase } from "~/lib/supabase";
import { getServerClient } from "~/lib/sbServerClient";
import { useLoaderData } from "react-router";
import type { Event as GameEvent } from "~/types/event";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Home - Gryphon Gaming" },
		{ name: "description", content: "Gryphon Gaming - University of Guelph's gaming community. View upcoming events, tournaments, and join our inclusive gaming community." },
	];
}

export async function loader({ request }: Route.LoaderArgs) {
	const sbServerClient = getServerClient(request);
	const { data, error } = await sbServerClient.client
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
