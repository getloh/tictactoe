export type gameStateType = {
    p1Moves: number[];
    p2Moves: number[]
    p1turn: boolean;
    playerNames: string[]
    status: "playing" | "waiting" | "end"
    usersConnected: number
}