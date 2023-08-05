// import { Box, Typography } from "@mui/material";
import React from 'react'
import { TileFill } from '../../game/enums';


export interface GameTileProps {
    onClick?: Function;
    id: number;
    fill?: TileFill; 
}

export default function GameTile(props: GameTileProps): JSX.Element {


    return (
        <>
            <div 
            className="bg-white rounded-lg h-32 aspect-square hover:brightness-75 transition-all active:brightness-50 " 
            onClick={() => console.log("test")}
            >

            </div>
        </>
        // <Box onClick={() => {console.log("box click!")}} border="1px solid blue" >
        //     <Typography>Test </Typography>
        // </Box>
    )

}