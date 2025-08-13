import type React from "react";
import { useState } from "react";
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
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLogout = async () => {
		await signOut();
		setIsDropdownOpen(false);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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
		<div className="mzh flex items-center justify-between text-lg text-orange-600 tracking-wider font-medium gap-12 py-4 px-10">
			{/* Left side - Navigation items */}
			<div className="flex items-center gap-12">
				{filteredNavItems.map((item, index) => (
					<NavBarLink key={index} label={item.label} link={item.link} />
				))}
			</div>
			
			{/* Right side - User info and actions */}
			<div className="flex items-center gap-4">
				{user ? (
					<div className="relative">
						{/* User avatar/initials - clickable */}
						<button
							onClick={toggleDropdown}
							className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 text-sm font-semibold hover:bg-orange-200 transition-colors cursor-pointer"
						>
							{user.email?.charAt(0).toUpperCase() || 'U'}
						</button>
						
						{/* Dropdown menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
								{/* Username */}
								<div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
									<div className="font-medium">{user.email}</div>
								</div>
								
								{/* Role badges */}
								{(isAdmin || isExec) && (
									<div className="px-4 py-2 border-b border-gray-100">
										<div className="flex flex-wrap gap-1">
											{isAdmin && (
												<span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
													Admin
												</span>
											)}
											{isExec && (
												<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
													Exec
												</span>
											)}
										</div>
									</div>
								)}
								
								{/* Logout option */}
								<button
									onClick={handleLogout}
									className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
								>
									Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<NavBarLink label="LOGIN" link="/login" />
				)}
			</div>
		</div>
	);
};

export default NavBar;
