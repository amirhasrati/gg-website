export function About() {
	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col text-xl gap-16 min-h-0">
				<h1 className="bungee my-32 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
					All Players Welcome — No Skill Tree Required
				</h1>
				<p>
					Welcome to the official hub for gamers at the University of Guelph —
					where players, creators, and fans come together to share their passion
					for all things gaming. Whether you're into casual party games,
					competitive esports, or exploring virtual worlds, our club has a place
					for you.
				</p>
				<p>
					We host a variety of events throughout the year, including online
					tournaments, in-person game nights, and community scrims. It’s a space
					to connect, compete, and just have fun with fellow students who love
					gaming as much as you do.
				</p>
				<p>
					No matter your skill level or favorite genre, our goal is to build an
					inclusive and energetic gaming community on campus.
				</p>
				<div className="grid grid-cols-2 gap-6">
					<img className="rounded-2xl" src="/images/FightNight.JPG" alt="wingstop fight night"></img>
					<p>very epic and cool wingstop at fight night!</p>
					<p>mario maddness very sugoi!</p>
					<img className="rounded-2xl" src="/images/MarioMadness.JPG" alt="mario madness"></img>
					<img className="rounded-2xl" src="/images/LAN2023.jpg" alt="LAN event"></img>
					<p>epic amazing LAN event!</p>
				</div>
			</div>
		</main>
	);
}
