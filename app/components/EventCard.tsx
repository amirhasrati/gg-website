type EventCardProps = {
	title: string;
	description: string;
	date: string; // timestamptz
	location?: string;
};

const EventCard = ({ title, description, date, location }: EventCardProps) => {
	return (
		<div className="flex flex-col justify-between gap-2 bg-white shadow-sm rounded-2xl p-6 border border-gray-200 max-w-sm">
			<h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

			<p className="text-sm text-gray-600 mb-4">{description}</p>

			<div className="space-y-2 text-sm text-gray-600">
				<div className="w-full flex justify-between items-center">
					<span className="font-medium text-gray-700 w-16">Date:</span>
					<time>{new Date(date).toLocaleDateString()}</time>
				</div>
				<div className="w-full flex justify-between items-center">
					<span className="font-medium text-gray-700 w-16">Time:</span>
					<time>{new Date(date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</time>
				</div>
				{location && (
					<div className="w-full flex justify-between items-center">
						<span className="font-medium text-gray-700 w-16">Location:</span>
						<span>{location}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default EventCard;
