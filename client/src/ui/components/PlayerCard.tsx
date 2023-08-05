import React from "react"
import { Paragraph } from "./Paragraph"


export interface PlayerCardProps {
    right?: boolean;
    name?: string;
    score?: number;
    player?: boolean;
}

export default function PlayerCard(props: PlayerCardProps) {


    return (

        <div
            className={`flex py-8 px-4 lg:w-1/3 w-1/2 rounded-lg justify-between items-center 
            ${props.player && "border-4 "}
            ${props.right ? "text-right bg-sky-700 flex-row-reverse" : "text-left bg-rose-800"}
        `}>
            <Paragraph className="text-xl font-semibold">{props.name ? props.name : "Waiting for player..."}</Paragraph>
            <Paragraph className="text-4xl font-semibold">{props.score}</Paragraph>
        </div>
    )
}