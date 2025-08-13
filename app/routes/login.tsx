import LoginPage from "~/components/LoginPage";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Home - Gryphon Gaming" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Login() {
	return <LoginPage />;
}
