export function About() {
	return (
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col text-lg gap-16 min-h-0">
				<h1 className="bungee my-16 text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
					All Players Welcome — No Skill Tree Required
				</h1>

				{/* Section 1: text then image (same on desktop) */}
				<div className="flex w-full flex-col items-center gap-16 p-4 md:flex-row">
					<p className="w-full md:w-1/2">
						Welcome to the official hub for gamers at the University of Guelph —
						a space where players, creators, and fans come together to share
						their passion for all things gaming. Whether you’re into casual
						party games, competitive esports, or exploring vast virtual worlds,
						our club offers something for everyone and a welcoming place to get
						involved.
					</p>
					<img
						src="/images/gg1.jpg"
						alt="A video game controller."
						className="w-full md:w-1/2 h-auto object-cover rounded-md"
					/>
				</div>

				{/* Section 2: keep DOM as text→image for mobile, flip on desktop */}
				<div className="flex w-full flex-col items-center gap-16 p-4 md:flex-row-reverse">
					<p className="w-full md:w-1/2">
						We host a variety of events throughout the year, including online
						tournaments, in-person game nights, and community scrims. These
						events are a chance to meet fellow students, try out new games, and
						take part in some friendly competition — or simply relax and enjoy
						the atmosphere.
					</p>
					<img
						src="/images/gg2.jpg"
						alt="Students playing video games at a club event."
						className="w-full md:w-1/2 h-auto object-cover rounded-md"
					/>
				</div>

				{/* Section 3: text then image (same on desktop) */}
				<div className="flex w-full flex-col items-center gap-16 p-4 md:flex-row">
					<p className="w-full md:w-1/2">
						No matter your skill level or favorite genre, our goal is to build
						an inclusive, energetic gaming community on campus. Whether you’ve
						been playing for years or are just getting started, you’ll find a
						place here to connect, have fun, and share in the love of gaming.
					</p>
					<img
						src="/images/gg3.JPG"
						alt="Students gathered at a campus gaming meetup."
						className="w-full md:w-1/2 h-auto object-cover rounded-md"
					/>
				</div>
			</div>
		</main>
	);
}
