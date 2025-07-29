import {
	type RouteConfig,
	route,
	layout,
	index,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
	layout("./components/Layout.tsx"),
] satisfies RouteConfig;
