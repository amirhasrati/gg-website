import EventCard from "./EventCard";
import PrimaryButton from "./PrimaryButton";

const HomePage: React.FC = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="bungee my-32 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
				A COMMUNITY FOR EVERY PLAYER
			</h1>
			<EventCard
				title="Mario Madness"
				description="Hang out and play mario games!"
				date="2025-08-12"
				time="6:30 PM"
			/>
			<PrimaryButton text="primary button"/>
		</div>
	);
};

export default HomePage;
