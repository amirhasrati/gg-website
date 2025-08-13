import type React from "react";
import NavBarLink from "./NavBarLink";
import { useAuth } from "~/useAuth";

const NavBar: React.FC = ({}) => {
	const { user, signOut, isAdmin, isExec } = useAuth();

	const handleLogout = async () => {
		await signOut();
	};

	return (
		<div className="mzh text-lg text-gray-50 tracking-wider font-medium flex gap-12 bg-orange-400 py-4 pl-10">
			<NavBarLink label="HOME" link="/" />
			<NavBarLink label="ABOUT" link="/about" />
			<NavBarLink label="EVENTS" link="/events" />

			{(isAdmin || isExec) && (
				<NavBarLink label="MANAGE EVENTS" link="/admin/events" />
			)}

			{/* {isAdmin && <NavBarLink label="ADMIN PANEL" link="/admin" />} */}

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
