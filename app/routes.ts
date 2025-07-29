import {
	type RouteConfig,
	route,
	layout,
	index,
} from "@react-router/dev/routes";

export default [
	layout("./components/Layout.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
