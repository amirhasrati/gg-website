import type React from "react";

type PrimaryButtonProps = {
    text: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
}) => {
    return (
        <div className = "cursor-pointer bg-orange-400 hover:brightness-80 font-medium rounded-4xl m-2 px-3 py-1">
            {text}
        </div>
    )
}

export default PrimaryButton;