import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    classname: string;
}

const Button = ({text, onClick, classname}: ButtonProps) => {
    return (
        <button onClick={onClick} className={classname}>
            {text}
        </button>
    )
}
export default Button;