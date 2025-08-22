import HomePage from "~/components/HomePage";
import { useLoaderData } from "react-router";
import { fetchAllEvents } from "~/lib/supabase/dataAccess";

export function meta() {
	return [
		{ title: "Home - Gryphon Gaming" },
		{
			name: "description",
			content:
				"Gryphon Gaming - University of Guelph's gaming community. View upcoming events, tournaments, and join our inclusive gaming community.",
		},
	];
}

export async function loader() {
	const data = await fetchAllEvents();
	return { events: data };
}

export default function Home() {
	const { events } = useLoaderData<typeof loader>();
	return <HomePage events={events} />;
}
