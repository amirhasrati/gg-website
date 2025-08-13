import LoginPage from "~/components/LoginPage";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Login - Gryphon Gaming" },
		{ name: "description", content: "Sign in to Gryphon Gaming with email sign-in link. Access your account and manage gaming events." },
	];
}

export default function Login() {
	return <LoginPage />;
}
