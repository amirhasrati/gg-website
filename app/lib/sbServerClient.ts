import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//null checking the environment variables
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables.");
}

//function that loaders and actions can use to access the server client
export const getServerClient = (request: Request): { client: typeof supabase, headers: typeof responseHeaders } => {
	const responseHeaders = new Headers();
	const supabase = createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get("Cookie") ?? "") ?? {};
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						responseHeaders.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						),
					);
				},
			},
		},
	);

	return { client: supabase, headers: responseHeaders };
};