import React from "react"

export interface ButtonProps{
    onClick: () => void;
    children?: JSX.Element | string;
    disabled?: boolean;
}

export default function Button(props:ButtonProps){

    return (
        <div 
            className={`py-2 px-4 bg-sky-300 inline-block rounded-lg font-semibold transition select-none
            ${props.disabled ? "brightness-50 pointer-events-none" : "hover:brightness-110  active:brightness-125 cursor-pointer"}`}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}