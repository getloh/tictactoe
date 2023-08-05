import React from "react"

export interface ParagraphProps{
    children?: string | string[] | number;
    className?: string;
}

export function Paragraph (props: ParagraphProps) {

    return (

        <p className={`${props.className} text-white `}>
            {props.children}
        </p>
    )
}