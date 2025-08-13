import { useState, useEffect, useCallback } from "react";
import { supabase } from "~/supabase";
import { useAuth } from "~/useAuth";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type Event = {
	id: string;
	title: string;
	description: string;
	date: string; // This is timestamptz from database
	location?: string;
	created_at: string;
	updated_at: string;
	created_by: string;
};

type EventFormData = {
	title: string;
	description: string;
	date: string;
	location: string;
};

export function ManageEventsPage() {
	const { user, isAdmin, loading } = useAuth();
	const [events, setEvents] = useState<Event[]>([]);
	const [loadingEvents, setLoadingEvents] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);
	const [formData, setFormData] = useState<EventFormData>({
		title: "",
		description: "",
		date: "",
		location: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	// Redirect if not admin
	useEffect(() => {
		if (!loading && !isAdmin) {
			window.location.href = "/";
		}
	}, [loading, isAdmin]);

	const fetchEvents = useCallback(async () => {
		try {
			setLoadingEvents(true);
			console.log("Fetching events...");
			console.log("Current user:", user?.id);
			console.log("Is admin:", isAdmin);

			const { data, error } = await supabase
				.from("events")
				.select("*")
				.order("date", { ascending: true });

			if (error) {
				console.error("Supabase error fetching events:", error);
				throw error;
			}

			console.log("Fetched events:", data);
			console.log("Events count:", data?.length || 0);
			setEvents(data || []);
		} catch (err) {
			console.error("Error fetching events:", err);
			setError("Failed to fetch events");
		} finally {
			setLoadingEvents(false);
		}
	}, [user?.id, isAdmin]);

	useEffect(() => {
		if (isAdmin) {
			fetchEvents();
		}
	}, [isAdmin, fetchEvents]);

	// form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			date: "",
			location: "",
		});
		setEditingEvent(null);
		setShowForm(false);
		setError(null);
		setSuccess(null);
	};

	// Create new event
	const handleCreateEvent = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setError(null);
			setSuccess(null);

			if (!user?.id) {
				setError("User not authenticated");
				return;
			}

			// Format the date for database insertion
			const eventData = {
				...formData,
				created_by: user.id,
			};

			console.log("Inserting event data:", eventData);

			const { data, error } = await supabase
				.from("events")
				.insert([eventData])
				.select();

			if (error) {
				console.error("Supabase insert error:", error);
				throw error;
			}

			console.log("Event created successfully:", data);
			console.log("Insert response data:", data);
			console.log("Insert response error:", error);

			if (!data) {
				console.warn("Insert succeeded but no data returned");
			}

			setSuccess("Event created successfully!");
			resetForm();
			fetchEvents();
		} catch (error) {
			console.error("Error creating event:", error);
			setError("Failed to create event");
		}
	};

	const handleUpdateEvent = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editingEvent) return;

		try {
			setError(null);
			setSuccess(null);

			const { error } = await supabase
				.from("events")
				.update(formData)
				.eq("id", editingEvent.id);

			if (error) throw error;

			setSuccess("Event updated successfully!");
			resetForm();
			fetchEvents();
		} catch (error) {
			console.error("Error updating event:", error);
			setError("Failed to update event");
		}
	};

	// Delete event
	const handleDeleteEvent = async (eventId: string) => {
		if (!confirm("Are you sure you want to delete this event?")) return;

		try {
			setError(null);
			setSuccess(null);

			const { error } = await supabase
				.from("events")
				.delete()
				.eq("id", eventId);

			if (error) throw error;

			setSuccess("Event deleted successfully!");
			fetchEvents();
		} catch (error) {
			console.error("Error deleting event:", error);
			setError("Failed to delete event");
		}
	};

	const handleEditEvent = (event: Event) => {
		setEditingEvent(event);
		setFormData({
			title: event.title,
			description: event.description,
			date: event.date,
			location: event.location || "",
		});
		setShowForm(true);
	};

	const handleNewEvent = () => {
		resetForm();
		setShowForm(true);
	};

	if (loading) {
		return (
			<main className="flex items-center justify-center pt-16 pb-4">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-2 text-gray-600">Loading...</p>
				</div>
			</main>
		);
	}

	if (!isAdmin) {
		return (
			<main className="flex items-center justify-center pt-16 pb-4">
				<div className="text-center">
					<p className="text-red-600 text-lg">Access Denied</p>
					<p className="text-gray-600">
						You don't have permission to view this page.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="pt-16 pb-4 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Manage Events
					</h1>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={fetchEvents}
							className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors border border-gray-300 dark:border-gray-600"
						>
							🔄 Refresh
						</button>
						<PrimaryButton text="+ Create New Event" onClick={handleNewEvent} />
					</div>
				</div>

				{/* Success/Error Messages */}
				{success && (
					<div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg">
						{success}
					</div>
				)}
				{error && (
					<div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
						{error}
					</div>
				)}

				{/* Event Form */}
				{showForm && (
					<div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
							{editingEvent ? "Edit Event" : "Create New Event"}
						</h2>
						<form
							onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
									>
										Event Title *
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
									/>
								</div>
								<div>
									<label
										htmlFor="location"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
									>
										Location
									</label>
									<input
										type="text"
										id="location"
										name="location"
										value={formData.location}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
									/>
								</div>
								<div>
									<label
										htmlFor="date"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
									>
										Date & Time *
									</label>
									<input
										type="datetime-local"
										id="date"
										name="date"
										value={formData.date}
										onChange={handleInputChange}
										required
										className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									/>
								</div>
							</div>
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Description *
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									required
									rows={4}
									className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
								/>
							</div>
							<div className="flex gap-3">
								<PrimaryButton
									type="submit"
									text={editingEvent ? "Update Event" : "Create Event"}
								/>
								<SecondaryButton
									type="button"
									text="Cancel"
									onClick={resetForm}
								/>
							</div>
						</form>
					</div>
				)}

				{/* Events List */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
							All Events
						</h2>
					</div>
					{loadingEvents ? (
						<div className="p-6 text-center">
							<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-2 text-gray-600 dark:text-gray-400">
								Loading events...
							</p>
						</div>
					) : events.length === 0 ? (
						<div className="p-6 text-center text-gray-500 dark:text-gray-400">
							No events found. Create your first event!
						</div>
					) : (
						<div className="divide-y divide-gray-200 dark:divide-gray-700">
							{events.map((event) => (
								<div key={event.id} className="p-6">
									<div className="flex justify-between items-start">
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
												{event.title}
											</h3>
											<p className="text-gray-600 dark:text-gray-300 mb-3">
												{event.description}
											</p>
											<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
												<span>
													📅 {new Date(event.date).toLocaleDateString()}
												</span>
												<span>
													🕒 {new Date(event.date).toLocaleTimeString()}
												</span>
												{event.location && <span>📍 {event.location}</span>}
											</div>
										</div>
										<div className="flex gap-2 ml-4">
											<SecondaryButton
												text="Edit"
												onClick={() => handleEditEvent(event)}
											/>
											<button
												type="button"
												onClick={() => handleDeleteEvent(event.id)}
												className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
