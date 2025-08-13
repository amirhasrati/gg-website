import type React from "react";

type PrimaryButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	text,
	type = "button",
	onClick,
	disabled = false,
	className = "",
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
				inline-flex items-center justify-center
				px-6 py-2 text-sm font-semibold text-white
				bg-gradient-to-r from-orange-500 to-orange-600
				hover:from-orange-600 hover:to-orange-700
				active:from-orange-700 active:to-orange-800
				disabled:from-orange-300 disabled:to-orange-400
				disabled:cursor-not-allowed disabled:opacity-60
				rounded-lg shadow-sm
				transform transition-all duration-150 ease-in-out
				hover:scale-[1.02] active:scale-[0.98]
				border-0 outline-none focus:outline-none
				focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
				${className}
			`.trim()}
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
