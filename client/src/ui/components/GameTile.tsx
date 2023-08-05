// import { Box, Typography } from "@mui/material";
import React from 'react'
import { TileFill } from '../../game/enums';
import { Paragraph } from './Paragraph';


export interface GameTileProps {
    onClick?: () => void;
    id: number;
    fill?: TileFill;
    win?: boolean;
}

export default function GameTile(props: GameTileProps): JSX.Element {

    function getBgColor(){

        switch(props.fill){
            case TileFill.o:
                return " bg-sky-200"
            case TileFill.x :
                return " bg-rose-200"
            default: return "bg-white"
        }
    }

    return (
        <>
            <div 
            className={`rounded-lg h-24 sm:h-32 md:h-32 aspect-square 
            transition-all flex justify-center items-center 
            ${props.win && "saturate-200 border-8 border-yellow-700" } 
            ${!props.fill && "active:brightness-50 hover:brightness-75 "}
            ${getBgColor()}
            `} 
            onClick={props.onClick}
            >
                {/* <p>{props.id}</p> */}
                {props.fill == TileFill.o &&
                    <p className={`text-sky-950 font-bold text-6xl pointer-events-none ${props.win && "animate-pulse"}`}>O</p>
                }
                {props.fill == TileFill.x &&
                    <p className={`text-rose-950 font-bold text-6xl pointer-events-none ${props.win && "animate-pulse"}`}>X</p>
                }
            </div>
        </>
        // <Box onClick={() => {console.log("box click!")}} border="1px solid blue" >
        //     <Typography>Test </Typography>
        // </Box>
    )

}