import type React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Layout: React.FC = () => {
	return (
		<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
			<NavBar />
			<Outlet />
		</div>
	);
};

export default Layout;
