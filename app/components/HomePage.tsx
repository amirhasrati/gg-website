import EventCard from "./EventCard";

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="my-16 text-center text-6xl text-orange-400">
				Gryphon Gaming
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
