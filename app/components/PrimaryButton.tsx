import type React from "react";

type PrimaryButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	text,
	type,
	onClick,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className="cursor-pointer bg-orange-400 hover:brightness-80 font-medium rounded-4xl m-2 px-3 py-1"
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
