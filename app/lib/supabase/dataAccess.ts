import { supabase } from "./sbServerClient";
import type { Event } from "~/types/event";

//returns an array of all the events
const fetchAllEvents = async (): Promise<Event[]> => {
	const { data, error } = await supabase.from("events").select();

	if (error) {
		throw error;
	}

	return data ?? [];
};

//returns a single event with the event id as the paramter
const fetchEvent = async (id: string): Promise<Event> => {
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

//given an Event as a parameter the function inserts the Event into the database
const createEvent = async ( evnt: Event): Promise<void> => {
	const { error } = await supabase
		.from("events")
		.insert({ 
			id: evnt.id, 
			title: evnt.title, 
			description: evnt.description,
			date: evnt.date,
			location: evnt.location,
			created_at: evnt.created_at,
			updated_at: evnt.updated_at,
			created_by: evnt.created_by
		});

	if (error) {
		throw error;
	}
};

//given an Event as a parameter the function updates an existing event in the database
const updateEvent = async ( evnt: Event): Promise<void> => {
	const { error } = await supabase
		.from("events")
		.update({ 
			id: evnt.id, 
			title: evnt.title, 
			description: evnt.description,
			date: evnt.date,
			location: evnt.location,
			created_at: evnt.created_at,
			updated_at: evnt.updated_at,
			created_by: evnt.created_by
		})
		.eq("id", evnt.id);

	if (error) {
		throw error;
	}
};

//given an Event this function will delete any Event from the database with a matching event id
const deleteEvent = async ( evnt: Event): Promise<void> => {
	const response = await supabase
		.from("events")
		.delete()
		.eq("id", evnt.id);
};

export { fetchAllEvents, fetchEvent, createEvent, updateEvent, deleteEvent };
