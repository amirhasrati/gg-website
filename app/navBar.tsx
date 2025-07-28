import type React from "react";

/*
type NavBarProps = {
    children: React.ReactNode;
};
*/

const NavBar: React.FC = ({

}) => {
    return (
        <div className="columns-3 gap-30">
            <header>
                <a href={"http://localhost:5173/"}>Home </a>
            </header>
            <header>
                <a href={"http://localhost:5173/about"}> About</a>
            </header>

            <p>Events</p>
        </div>
    );
}

export default NavBar;