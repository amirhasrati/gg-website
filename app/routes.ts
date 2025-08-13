import {
	type RouteConfig,
	route,
	layout,
	index,
	prefix,
} from "@react-router/dev/routes";

export default [
	layout("./components/Layout.tsx", [
		index("routes/home.tsx"),
		route("about", "routes/about.tsx"),
		route("events", "routes/events.tsx"),
		route("admin/events", "routes/manage-events.tsx"),
		route("login", "routes/login.tsx"),
		route("auth/callback", "routes/auth.callback.tsx"),
	]),
] satisfies RouteConfig;
