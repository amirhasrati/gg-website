import LoginPage from "~/components/LoginPage";
import type { Route } from "./+types/login";
import { supabase } from "~/lib/supabase/sbServerClient";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Login - Gryphon Gaming" },
		{
			name: "description",
			content:
				"Sign in to Gryphon Gaming with email sign-in link. Access your account and manage gaming events.",
		},
	];
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email");

	if (!email || typeof email !== "string") {
		return {
			success: false,
			error: "Email is required.",
		};
	}

	const rootUrl = request.url.replace("/login", "");
	const emailRedirectTo = `${rootUrl}/auth`;

	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo,
		},
	});

	if (error) {
		return {
			success: false,
			error: error.message || "Failed to send sign-in link.",
		};
	}

	return {
		success: true,
		message: "Sign-in link sent! Check your email inbox.",
	};
}

export default function Login() {
	return <LoginPage />;
}
