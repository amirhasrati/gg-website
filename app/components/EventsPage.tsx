import { useState, useEffect, useCallback } from "react";
import { supabase } from "~/supabase";
import EventCard from "./EventCard";

type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
	location?: string;
	created_at: string;
	updated_at: string;
	created_by: string;
};

export function Events() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchEvents = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const { data, error } = await supabase
				.from("events")
				.select("*")
				.order("date", { ascending: true });

			if (error) {
				console.error("Error fetching events:", error);
				throw error;
			}

			setEvents(data || []);
		} catch (error) {
			console.error("Error fetching events:", error);
			setError("Failed to fetch events");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	if (loading) {
		return (
			<main className="pt-16 pb-4 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
				<div className="max-w-6xl mx-auto">
					<div className="text-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
						<p className="mt-4 text-gray-600 dark:text-gray-400">
							Loading events...
						</p>
					</div>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="pt-16 pb-4 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
				<div className="max-w-6xl mx-auto">
					<div className="text-center py-20">
						<div className="text-red-600 text-xl mb-4">⚠️</div>
						<p className="text-red-600 text-lg mb-2">Failed to load events</p>
						<p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
						<button
							onClick={fetchEvents}
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
						>
							Try Again
						</button>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="pt-16 pb-4 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Upcoming Events
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Join us for exciting gaming events and tournaments
					</p>
				</div>

				{events.length === 0 ? (
					<div className="text-center py-20">
						<div className="text-gray-400 text-6xl mb-4">📅</div>
						<p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
							No events scheduled
						</p>
						<p className="text-gray-500 dark:text-gray-500">
							Check back later for upcoming events!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{events.map((event) => (
							<EventCard
								key={event.id}
								title={event.title}
								description={event.description}
								date={event.date}
								location={event.location}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
