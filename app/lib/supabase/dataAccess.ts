import { supabase } from "./sbServerClient";
import type { Event } from "~/types/event";

const fetchAllEvents = async (): Promise<Event[]> => {
	const { data, error } = await supabase.from("events").select();

	if (error) {
		throw error;
	}

	return data ?? [];
};

export { fetchAllEvents };
