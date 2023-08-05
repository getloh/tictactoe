import React, { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard';
import { Paragraph } from '../components/Paragraph';
import PlayerCard from '../components/PlayerCard';
import Background from '../components/Background';
// import { Box } from '@mui/material';
import { socket } from '../../game/Socket'
import NameInputModal from '../components/NameInputModal';
import { gameStateType } from '../../game/types';

export default function Home() {
    const [playerTurn, setPlayerTurn] = useState(0);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [playerName, setPlayerName] = useState("");
    const [gameState, setGameState] = useState<gameStateType>(
        {
            p1Moves: [],
            p2Moves: [],
            p1turn: true,
            playerNames: [],
            status: "waiting",
            usersConnected: 0
        }
    )

    useEffect(() => {

        function updateGameState(item: any) {
            console.log(item);
            setGameState(item);
        }

        socket.on('gameState', updateGameState)

        return (() => {
            socket.off('gameState');
        })
    })

    function submitPlayerName(name: string) {

        socket.emit('setName', name);
        setPlayerName(name)
    }

    function whichPlayerAmI(){
        return gameState.playerNames.indexOf(playerName)
    }

    function playTile(tile: number){
        let playerNumber = whichPlayerAmI();
        console.log(tile)
        if (playerNumber == 0 && gameState.p1turn){
            socket.emit('gameAction', {  box: tile });
        }
        else if (playerNumber == 1 && !gameState.p1turn){
            socket.emit('gameAction', {  box: tile });
        }
        else {
            return;
        }
    }

    return (
        <>
            <div className="overflow-hidden">

                {
                    playerName == "" &&
                    <NameInputModal onSubmit={(name) => submitPlayerName(name)} />
                }

                <Background right={!gameState.p1turn} />
                <div className={` h-screen w-screen flex flex-col justify-between items-center pt-8 px-4 z-20 absolute top-0 left-0 transition ${playerName !== "" ? "" : "blur"}`}>
                    <div className="flex justify-between w-full">
                        <PlayerCard name={gameState.playerNames[0] ? gameState.playerNames[0] : "Waiting for player"} />
                        <div>
                            <Paragraph>0 - 0</Paragraph>
                        </div>
                        <PlayerCard right name={gameState.playerNames[1] ? gameState.playerNames[1] : "Waiting for player"}/>
                    </div>

                    <GameBoard gameState={gameState} onClick={(tile: number) => playTile(tile)} />

                    <div className="absolute right-0 bottom-0 opacity-25">
                        <Paragraph></Paragraph>
                    </div>
                    <button onClick={() => { setPlayerTurn(playerTurn + 1) }}>
                        test
                    </button>
                </div>
            </div>
        </>
        // <Box >

        // <p>Test</p>
        // </Box>
    )
}