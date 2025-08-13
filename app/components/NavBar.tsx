import type React from "react";
import NavBarLink from "./NavBarLink";
import { useAuth } from "~/lib/useAuth";

type NavItem = {
	label: string;
	link: string;
	requiresAuth?: boolean;
	requiresAdmin?: boolean;
	requiresExec?: boolean;
};

type NavBarProps = {
	navItems?: NavItem[]
};

const NavBar: React.FC<NavBarProps> = ({ navItems = [] }) => {
	const { user, signOut, isAdmin, isExec } = useAuth();

	const handleLogout = async () => {
		await signOut();
	};

	// Filter navigation items based on user permissions
	const filteredNavItems = navItems.filter(item => {
		// Check authentication first
		if (item.requiresAuth && !user) return false;
		
		// Check role requirements based on the logic:
		// - If both requiresExec and requiresAdmin: either Admin OR Exec role is accepted
		// - If only one is set: only that specific role is accepted
		// - If neither flag is set: any role is accepted
		
		if (item.requiresAdmin && item.requiresExec) {
			// Both flags set: either Admin OR Exec role works
			if (!isAdmin && !isExec) return false;
		} else if (item.requiresAdmin && !item.requiresExec) {
			// Only requiresAdmin: only Admin role works
			if (!isAdmin) return false;
		} else if (item.requiresExec && !item.requiresAdmin) {
			// Only requiresExec: only Exec role works
			if (!isExec) return false;
		}
		// If neither flag is set, any role is accepted (no filtering needed)
		
		return true;
	});

	return (
		<div className="mzh text-lg text-gray-50 tracking-wider font-medium flex gap-12 bg-orange-400 py-4 pl-10">
			
			{filteredNavItems.map((item, index) => (
				<NavBarLink key={index} label={item.label} link={item.link} />
			))}
			
			{user ? (
				<div className="flex items-center gap-4">
					<span className="text-sm">
						{user.email}
						{isAdmin && " (Admin)"}
						{isExec && " (Exec)"}
					</span>
					<button
						onClick={handleLogout}
						className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded text-white text-sm"
					>
						LOGOUT
					</button>
				</div>
			) : (
				<NavBarLink label="LOGIN" link="/login" />
			)}
		</div>
	);
};

export default NavBar;
