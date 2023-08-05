// import { Box } from "@mui/material";
import React from 'react'
import GameTile from "./GameTile";
import { Paragraph } from './Paragraph';
import { TileFill } from '../../game/enums';



export default function GameBoard(): JSX.Element {

    return (
        <>
            <div className="bg-zinc-700 p-8 rounded-xl">

                <Paragraph className="text-2xl pb-4">Player 1's turn!</Paragraph>

                <div className="flex gap-2 flex-col">
                    <div className="flex gap-2">
                        <GameTile id={1} />
                        <GameTile id={2} />
                        <GameTile id={3} />
                    </div>

                    <div className="flex gap-2">
                        <GameTile id={4} fill={TileFill.o}/>
                        <GameTile id={5} />
                        <GameTile id={6} fill={TileFill.x}/>
                    </div>

                    <div className="flex gap-2">
                        <GameTile id={7} />
                        <GameTile id={8} />
                        <GameTile id={9} />
                    </div>
                </div>



            </div>

        </>
        // <Box sx={{ display: 'grid' }} gridTemplateColumns={"repeat(3, 10rem)"} gridTemplateRows={"repeat(3, 10rem)"}>


        // </Box>
    )
}