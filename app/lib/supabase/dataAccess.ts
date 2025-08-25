import type { UUID } from "crypto";
import { supabase } from "./sbServerClient";
import type { Event } from "~/types/event";

const fetchAllEvents = async (): Promise<Event[]> => {
	const { data, error } = await supabase.from("events").select();

	if (error) {
		throw error;
	}

	return data ?? [];
};

const fetchEvent = async (id: UUID): Promise<Event> => {
	const { data, error } = await supabase
	.from("events")
	.select()
	.eq("id", id)
	.single();

	if (error) {
		throw error;
	}

	return data as Event;
};

export { fetchAllEvents, fetchEvent };
