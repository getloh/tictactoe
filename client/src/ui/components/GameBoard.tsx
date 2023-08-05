// import { Box } from "@mui/material";
import React from 'react'
import GameTile from "./GameTile";
import { Paragraph } from './Paragraph';
import { TileFill } from '../../game/enums';

export interface GameBoardProps{
    gameState?: {
        p1Moves: number[],
        p2Moves: number[]
    };
    winState: null| string;
    onClick: Function;
}

export default function GameBoard(props: GameBoardProps): JSX.Element {

    function getTileFill(tile: number){

        if (props.gameState?.p1Moves.includes(tile)){
            return TileFill.x
        }
        if (props.gameState?.p2Moves.includes(tile)){
            return TileFill.o
        }
        // return TileFill.e

    }

    function generateTiles(){

        let grid = [];

        for(let i = 1; i < 10; i++){
            grid.push(<GameTile id={i} onClick={() => props.onClick(i)} fill={getTileFill(i)} key={"gridTile"+ i} win={props.winState?.includes(i.toString())}/>)
        }

        return grid
    }
    
    return (
        <>

                <div className=" grid grid-cols-3 grid-rows-3 gap-2">
                {/* <div className="flex gap-2 flex-col"> */}

                    {/* <div className="flex gap-2"> */}
                    {
                        generateTiles()
                    }
                        {/* <GameTile id={1} onClick={() => props.onClick(1)} fill={TileFill.o}/>
                        <GameTile id={2} onClick={() => props.onClick(2)} fill={TileFill.x}/>
                        <GameTile id={3} onClick={() => props.onClick(3)}/> */}
                    {/* </div> */}

                    {/* <div className="flex gap-2"> */}
                        {/* <GameTile id={4} onClick={() => props.onClick(4)}/>
                        <GameTile id={5} onClick={() => props.onClick(5)}/>
                        <GameTile id={6} onClick={() => props.onClick(6)}/> */}
                    {/* </div> */}

                    {/* <div className="flex gap-2"> */}
                        {/* <GameTile id={7} onClick={() => props.onClick(7)}/>
                        <GameTile id={8} onClick={() => props.onClick(8)}/>
                        <GameTile id={9} onClick={() => props.onClick(9)}/> */}
                    {/* </div> */}
                </div>



            {/* </div> */}

        </>
        // <Box sx={{ display: 'grid' }} gridTemplateColumns={"repeat(3, 10rem)"} gridTemplateRows={"repeat(3, 10rem)"}>


        // </Box>
    )
}