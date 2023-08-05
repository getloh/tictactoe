// import { Box } from "@mui/material";
import React from 'react'
import GameTile from "./GameTile";
import { Paragraph } from './Paragraph';
import { TileFill } from '../../game/enums';

export interface GameBoardProps {
    gameState?: {
        p1Moves: number[],
        p2Moves: number[]
    };
    winState: null | string;
    onClick: Function;
}

export default function GameBoard(props: GameBoardProps): JSX.Element {

    function getTileFill(tile: number) {
        if (props.gameState?.p1Moves.includes(tile)) {
            return TileFill.x
        }
        if (props.gameState?.p2Moves.includes(tile)) {
            return TileFill.o
        }
    }

    function generateTiles() {

        let grid = [];

        for (let i = 1; i < 10; i++) {
            grid.push(<GameTile id={i} onClick={() => props.onClick(i)} fill={getTileFill(i)} key={"gridTile" + i} win={props.winState?.includes(i.toString())} />)
        }

        return grid
    }

    return (
        <div className=" grid grid-cols-3 grid-rows-3 gap-2">
            {
                generateTiles()
            }
        </div>
    )
}