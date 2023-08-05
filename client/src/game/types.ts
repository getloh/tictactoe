export type gameStateType = {
    p1Moves: number[];
    p2Moves: number[];
    p1turn: boolean;
    playerNames: string[];
    status: "playing" | "waiting" | "end";
    usersConnected: number;
    p1Wins: number;
    p2Wins: number;
}

export type gameOverType = {
    winState: string | null;
    message: string | null;
}