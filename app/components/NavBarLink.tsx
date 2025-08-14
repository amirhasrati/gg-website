import { NavLink } from "react-router";

type NavBarLinkProps = {
    label: string;
	link: string;
};

const NavBarLink = ({ label, link }: NavBarLinkProps) => {
    return (
        <NavLink 
            to={link} 
            className={({ isActive }) => 
                isActive ? "nav-link active" : "nav-link"
            }
        >
            {label}
        </NavLink>
    );
}

export default NavBarLink;