import type React from "react";

type ImageButtonProps = {
	src: string;
	onClick: () => void;
	type?: "button" | "submit" | "reset";
};

const ImageButton: React.FC<ImageButtonProps> = ({ src, onClick, type = "button" }) => {
	return (
		<button type={type} onClick={onClick}>
			<img src={src} alt="Button" />
		</button>
	);
};

export default ImageButton;
