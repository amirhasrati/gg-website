import type React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Layout: React.FC = () => {
	return (
		<div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
			<Outlet />
		</div>
	);
};

export default Layout;
