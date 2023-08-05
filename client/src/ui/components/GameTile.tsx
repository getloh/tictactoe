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


    return (
        <>
            <div 
            className={`bg-white rounded-lg h-32 aspect-square 
            transition-all  flex justify-center items-center
            ${props.win && "saturate-200 border-8 border-zinc-900" } 
            ${!props.fill && "active:brightness-50 hover:brightness-75 "}
            ${props.fill == TileFill.o && "bg-sky-200 "}
            ${props.fill == TileFill.x && "bg-rose-200 "}
            `} 
            onClick={props.onClick}
            >
                {props.fill == TileFill.o &&
                    <Paragraph className="text-sky-950 font-bold text-6xl pointer-events-none">O</Paragraph>
                }
                {props.fill == TileFill.x &&
                    <Paragraph className="text-rose-950 font-bold text-6xl pointer-events-none">X</Paragraph>
                }
            </div>
        </>
        // <Box onClick={() => {console.log("box click!")}} border="1px solid blue" >
        //     <Typography>Test </Typography>
        // </Box>
    )

}