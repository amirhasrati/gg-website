import type React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { navigationConfig } from "~/lib/navigation";

const Layout: React.FC = () => {
	return (
		<div>
			{/* NavBar outside the constrained container - spans full width */}
			<NavBar navItems={navigationConfig} />
			
			{/* Content container with padding/constraints */}
			<div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
