import React, {useState} from 'react';
import GameBoard from '../components/GameBoard';
import { Paragraph } from '../components/Paragraph';
import PlayerCard from '../components/PlayerCard';
import Background from '../components/Background';
// import { Box } from '@mui/material';

export default function Home() {
    const [playerTurn, setPlayerTurn] = useState(0);

    return (
        <>

            <Background right={playerTurn % 2 == 0}/>
            <div className="h-screen w-screen flex flex-col justify-between items-center pt-8 px-4 z-20 absolute top-0 left-0">
                <div className="flex justify-between w-full">
                    <PlayerCard />
                    <div>
                        <Paragraph>0 - 0</Paragraph>
                    </div>
                    <PlayerCard right/>

                </div>
                <GameBoard />
                <div></div>

                <div className="absolute right-0 bottom-0 opacity-25">
                    <Paragraph></Paragraph>
                </div>
                <button onClick={() => {setPlayerTurn(playerTurn+1)}}>
        test
                </button>
            </div>
        </>
        // <Box >

        // <p>Test</p>
        // </Box>
    )
}