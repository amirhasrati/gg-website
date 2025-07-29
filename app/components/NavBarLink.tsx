import type React from "react";

type NavBarLinkProps = {
    label: string;
	link: string;
};

const NavBarLink: React.FC<NavBarLinkProps> = ({
    label,
    link,
}) => {
    return (
        <div>
            <a href={link}>{label}</a> 
        </div>
    );
}

export default NavBarLink;