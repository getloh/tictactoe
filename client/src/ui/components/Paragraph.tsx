import React from "react"

export interface ParagraphProps{
    children?: string | string[];
    className?: string;
}

export function Paragraph (props: ParagraphProps) {

    return (

        <p className={`text-base text-white ${props.className}`}>
            {props.children}
        </p>
    )
}