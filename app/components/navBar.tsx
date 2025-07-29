import type React from "react";

/*
type NavBarProps = {
    children: React.ReactNode;
};
*/
//add type, use for each loop with a list for links to be their own component
const NavBar: React.FC = ({

}) => {
    return (
        <div className="columns-3 gap-30">
            <header>
                <a href={"/"}>Home </a>
            </header>
            <header>
                <a href={"/about"}> About</a>
            </header>

            <p>Events</p>
        </div>
    );
}

export default NavBar;