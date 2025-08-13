import type React from "react";

type SecondaryButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
	text,
	type,
	onClick,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className="cursor-pointer border-3 hover:brightness-70 font-medium rounded-4xl m-2 px-3 py-1"
		>
			{text}
		</button>
	);
};

export default SecondaryButton;