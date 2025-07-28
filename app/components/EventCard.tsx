import type React from "react";

type EventCardProps = {
	title: string;
	description: string;
	date: string;
	time: string;
};

const EventCard: React.FC<EventCardProps> = ({
	title,
	description,
	date,
	time,
}) => {
	return (
		<div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 max-w-sm">
			<h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

			<p className="text-sm text-gray-600 mb-4">{description}</p>

			<div className="flex items-center text-sm text-gray-500">
				<span className="mr-4">
					📅 <time>{date}</time>
				</span>
				<span>
					🕒 <time>{time}</time>
				</span>
			</div>
		</div>
	);
};

export default EventCard;
