import EventCard from "./EventCard";

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="bungee my-32 text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
				A COMMUNITY FOR EVERY PLAYER
			</h1>
			<EventCard
				title="Mario Madness"
				description="Hang out and play mario games!"
				date="2025-08-12"
				time="6:30 PM"
			/>
		</div>
	);
};

export default HomePage;
