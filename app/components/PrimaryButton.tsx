import type React from "react";

type PrimaryButtonProps = {
    text: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
}) => {
    return (
        <div className = "bg-orange-400 hover:brightness-80 font-medium rounded-4xl px-3 py-1">
            {text}
        </div>
    )
}

export default PrimaryButton;