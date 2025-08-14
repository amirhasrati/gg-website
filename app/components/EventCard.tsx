type EventCardProps = {
	title: string;
	description: string;
	date: string; // timestamptz
	location?: string;
};

const EventCard = ({ title, description, date, location }: EventCardProps) => {
	return (
		<div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 max-w-sm">
			<h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

			<p className="text-sm text-gray-600 mb-4">{description}</p>

			<div className="flex items-center text-sm text-gray-500">
				<span className="mr-4">
					📅 <time>{new Date(date).toLocaleDateString()}</time>
				</span>
				<span className="mr-4">
					🕒 <time>{new Date(date).toLocaleTimeString()}</time>
				</span>
				{location && <span>📍 {location}</span>}
			</div>
		</div>
	);
};

export default EventCard;
