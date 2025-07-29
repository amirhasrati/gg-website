import type React from "react";
import NavBarLink from "./NavBarLink";


//add type, use foreach loop with a list for links to be their own component
const NavBar: React.FC = ({
    
}) => {
    return (
        <div className="columns-3 gap-30">
            <NavBarLink 
                label = "Home"
                link = "/"/>
            <NavBarLink 
                label = "About"
                link = "/about"/>
            <NavBarLink 
                label = "Events"
                link = "/event"/>
        </div>
    );
}

export default NavBar;