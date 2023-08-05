import React, { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard';
import { Paragraph } from '../components/Paragraph';
import PlayerCard from '../components/PlayerCard';
import Background from '../components/Background';
// import { Box } from '@mui/material';
import { socket } from '../../game/Socket'
import NameInputModal from '../components/NameInputModal';
import { gameOverType, gameStateType } from '../../game/types';
import Button from '../components/Button';

export default function Home() {
    const [isConnected, setIsConnected] = useState(socket.connected);    
    const [playerTurn, setPlayerTurn] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [gameOver, setGameOver] = useState<gameOverType>({ winState: null, message: null });
    const [score, setScore] = useState([0,0])
    const [gameState, setGameState] = useState<gameStateType>(
        {
            p1Moves: [],
            p2Moves: [],
            p1turn: true,
            playerNames: ["Player 1", "Player 2"],
            status: "waiting",
            usersConnected: 0,
            p1Wins: 0,
            p2Wins: 0
        }
    )

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
          }
      
          function onDisconnect() {
            setIsConnected(false);
          }

        function updateGameState(item: any):void {
            console.log(item);
            setGameState(item);
        }

        function updateGameOver(data: gameOverType):void {
            console.log(data);
            setGameOver(data)
        }

        function gameReset(){
            setPlayerName("");
            setGameOver({winState: null, message: null});
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('gameState', updateGameState)
        socket.on('gameOver', (data: gameOverType) => updateGameOver(data))
        socket.on('reset', gameReset)


        return (() => {
            socket.off('gameState');
            socket.off('gameOver')
        })
    })

    function submitPlayerName(name: string): void {

        socket.emit('setName', name);
        setPlayerName(name)
    }

    function whichPlayerAmI(): number {
        return gameState.playerNames.indexOf(playerName)
    }

    function playTile(tile: number): void {
        // Sends played Tile
        let playerNumber = whichPlayerAmI();
        console.log(tile)
        if (playerNumber == 0 && gameState.p1turn) {
            socket.emit('gameAction', { box: tile });
        }
        else if (playerNumber == 1 && !gameState.p1turn) {
            socket.emit('gameAction', { box: tile });
        }
        else {
            return;
        }
    }

    function statusMessage(): string {
        //Returns the current status message (playing/waiting/winner)
        if (!isConnected){
            return "Unable to connect to server..."
        }
        if (gameState.status == "waiting") {
            return "Waiting for 2 players"
        }
        if (gameState.status == "end" && gameOver?.message !== null) {
            return gameOver.message
        }
        return gameState.p1turn ? `${gameState.playerNames[0]}'s Turn!` : `${gameState.playerNames[1]}'s Turn!`

    }

    function rematch() {
        socket.emit('rematch', "restartgame");
    }

    function triggerReset(){
        socket.emit('restart', "restartgame");
    }


    return (
        <>
            <div className="overflow-hidden h-screen">
                {
                    playerName == "" &&
                    <NameInputModal onSubmit={(name) => submitPlayerName(name)} />
                }

                <Background right={!gameState.p1turn} />
                <div className={` h-screen w-screen flex flex-col items-center pt-8 px-4 z-20 absolute top-0 left-0 transition ${playerName !== "" ? "" : "blur"}`}>

                    <div className="flex justify-between w-full gap-8">
                        <PlayerCard 
                        name={gameState.playerNames[0] ? gameState.playerNames[0] : "Waiting for player"} 
                        score={gameState.p1Wins}
                        player={playerName == gameState.playerNames[0]}
                        />

                        <PlayerCard 
                        right 
                        name={gameState.playerNames[1] ? gameState.playerNames[1] : "Waiting for player"} 
                        score={gameState.p2Wins}
                        player={playerName == gameState.playerNames[1]}
                        />
                    </div>

                    <div className="bg-zinc-700 p-8 rounded-xl mt-12">
                        <Paragraph className="text-2xl pb-4">{statusMessage()}</Paragraph>
                        <GameBoard gameState={gameState} onClick={(tile: number) => playTile(tile)} winState={gameOver.winState} />
                    </div>

                    <div className="absolute left-2 bottom-2 opacity-50">
                    <Paragraph>{gameState.usersConnected + " Users connected"}</Paragraph>
                    </div>
                    <div className="absolute right-2 bottom-2">
                    <Button className="" onClick={triggerReset}>Reset Game</Button>
                    </div>

                    {
                        gameOver.winState !== null &&
                        <Button className="mt-4 text-2xl" onClick={rematch}>Rematch?</Button>
                    }

                </div>
            </div>
        </>
        // <Box >

        // <p>Test</p>
        // </Box>
    )
}