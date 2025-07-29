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
	]),
] satisfies RouteConfig;
