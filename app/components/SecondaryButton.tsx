import type React from "react";

type SecondaryButtonProps = {
    text: string;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    text,
}) => {
    return (
        <div className = "cursor-pointer border-3 hover:brightness-70 font-medium rounded-4xl m-2 px-3 py-1">
            {text}
        </div>
    )
}

export default SecondaryButton;