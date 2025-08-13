import EventCard from "./EventCard";
import type { Event } from "~/types/event";

interface EventsPageProps {
	events: Event [];
}

export function Events({ events }: EventsPageProps) {

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

