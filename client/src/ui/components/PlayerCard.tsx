import React from "react"
import { Paragraph } from "./Paragraph"


export interface PlayerCardProps{
    right?: boolean;
    name?: string;
}

export default function PlayerCard(props: PlayerCardProps){


    return (

        <div className={`py-8 px-8 rounded-lg ${props.right ? "text-right pl-24 bg-sky-700" : "text-left pr-24 bg-rose-800"}`}>
        <Paragraph className="text-lg font-semibold">{props.name ? props.name : "Waiting for player..."}</Paragraph>
        </div>
    )
}