import NavBar from "../components/navBar";

export function About() {
    return (
		
		<main className="flex items-center justify-center pt-16 pb-4">
			<div className="flex-1 flex flex-col items-center gap-16 min-h-0">
				<NavBar />
				<p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
					about us :D
				</p>
			</div>
		</main>
	);
}