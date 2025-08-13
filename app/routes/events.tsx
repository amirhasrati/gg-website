import type { Route } from "./+types/home";
import { Events } from "../components/EventsPage";
import { supabase } from "~/lib/supabase";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Events - Gryphon Gaming" },
		{ name: "description", content: "Everyone is welcome!" },
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
	
	return { events:  (data ?? []) as Event};
}

export default function EventsRoute() {
	const { events } = useLoaderData<typeof loader>();
	return <Events events={events} />;
}
