import EventCard from "./EventCard";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import type { Event } from "~/types/event";

interface HomePageProps {
	events: Event[];
}

const HomePage: React.FC<HomePageProps> = ({ events }) => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="bungee my-32 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
				A COMMUNITY FOR EVERY PLAYER
			</h1>
			
			{/* Events Section */}
			<div className="w-full max-w-6xl px-4 mb-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						Upcoming Events
					</h2>
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
		</div>
	);
};

export default HomePage;
