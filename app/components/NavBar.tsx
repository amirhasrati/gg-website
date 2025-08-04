import type React from "react";
import NavBarLink from "./NavBarLink";

//add type, use foreach loop with a list for links to be their own component
const NavBar: React.FC = ({}) => {
	return (
		<div className="mzh text-lg text-gray-50 tracking-wider font-medium flex gap-12 bg-orange-400 py-4 pl-10">
			<NavBarLink label="HOME" link="/" />
			<NavBarLink label="ABOUT" link="/about" />
			<NavBarLink label="EVENTS" link="/events" />
		</div>
	);
};

export default NavBar;
