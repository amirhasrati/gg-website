import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; // optional for custom styling
    type?: "button" | "submit" | "reset";
};

/*
const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};
*/

function NavBar() {
    return (
        <div className="columns-3">
            <a href={"http://localhost:5173/"}>Home</a>
            <a href={"http://localhost:5173/about"}>About</a>
            <p>events</p>
        </div>
    );
}

export default NavBar;