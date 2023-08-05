import React from "react"


export interface BackgroundProps{
    children?: React.ReactNode;
    right?: boolean;
}

export default function Background(props: BackgroundProps){


    return (

        <div className="w-screen h-full relative top-0 left-0 bg-zinc-500 z-0 overflow-hidden">
            <div className={`w-1/2 h-full bg-gradient-to-r from-rose-400 absolute left-0 transition ${props.right ? "-translate-x-full" : null}`} ></div>
            <div className={`w-1/2 h-full bg-gradient-to-l from-sky-400 absolute right-0 transition ${props.right ? null : "translate-x-full"}`}></div>

        </div>
    )
}