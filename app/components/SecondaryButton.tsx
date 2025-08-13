import type React from "react";

type SecondaryButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
				px-6 py-2 text-sm font-semibold
				bg-transparent text-orange-600
				border-2 border-orange-500
				hover:bg-orange-50 hover:border-orange-600
				active:bg-orange-100 active:border-orange-700
				disabled:text-orange-300 disabled:border-orange-300
				disabled:cursor-not-allowed disabled:opacity-60
				rounded-lg shadow-sm
				transform transition-all duration-150 ease-in-out
				hover:scale-[1.02] active:scale-[0.98]
				outline-none focus:outline-none
				focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
				${className}
			`.trim()}
		>
			{text}
		</button>
	);
};

export default SecondaryButton;