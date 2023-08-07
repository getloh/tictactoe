
const port = 3000
const http = require('http');
const server = http.createServer();
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:9500"
    }
});

server.listen(port);

let usersConnected = 0;
let playerNames = [];
let p1Moves = [];
let p2Moves = [];
let p1turn = true;
let status = "waiting";     //"waiting" | "playing" | "end"
let p1Wins = 0;
let p2Wins = 0;

io.on('connection', (socket) =>
{
    usersConnected++;
    console.log("User Connected - " + usersConnected + ' Users online');
    sendGameState();

    socket.on('setName', (payload) =>
    {
        // uid + name
        console.log("setName: " + payload)
        if (playerNames.length <= 2)
        {
            playerNames.push(payload);
            if (playerNames.length == 2)
            {
                status = "playing";
                p1turn = Math.random() > 0.5
            }
            sendGameState();
        }
        else
        {
            sendGameError("2 players already registered")
        }
    });

    socket.on('gameAction', (payload) =>
    {
        // A player did something

        if (status == "playing")
        {
            console.log(payload)
            // Check if the box is already occupied
            if (p1Moves.includes(payload.box) || p2Moves.includes(payload.box))
            {
                console.log("this box has is already occupied");
                sendGameError("Space already occupied!");
            }
            // if it's not, update the box
            else
            {
                if (p1turn)
                {
                    p1Moves.push(payload.box)
                }
                else
                {
                    p2Moves.push(payload.box)
                }
                sendGameUpdate(payload.box);
                if (!gameUpdate())
                {
                    p1turn = !p1turn;
                }
            }
            sendGameState();
        }

    });

    socket.on('restart', () =>
    {
        restartGame();
    })

    socket.on('rematch', () =>
    {
        rematchGame();
    })

    socket.on('disconnect', () =>
    {
        usersConnected--;
        console.log('User disconnected - ' + usersConnected + " Users still online");
        if (usersConnected == 0)
        {
            restartGame();
        }
    });

});

function sendGameState()
{
    io.emit('gameState', { playerNames, p1Moves, p2Moves, p1turn, status, usersConnected, p1Wins, p2Wins })
}

function gameUpdate()
{
    let winnerFound = false;
    //Determines game complete
    function smushAndCheck(arr)
    {
        //Takes an array of numbers, and checks for winning state
        // let str = arr.sort().join('');
        // Lord forgive me for this bruteforce

        if (arr.includes(1) && arr.includes(2) && arr.includes(3))
        {
            return "123";
        }
        if (arr.includes(4) && arr.includes(5) && arr.includes(6))
        {
            return "456";
        }
        if (arr.includes(7) && arr.includes(8) && arr.includes(9))
        {
            return "789";
        }
        if (arr.includes(1) && arr.includes(5) && arr.includes(9))
        {
            return "159";
        }
        if (arr.includes(3) && arr.includes(5) && arr.includes(7))
        {
            return "357";
        }
        if (arr.includes(1) && arr.includes(4) && arr.includes(7))
        {
            return "147";
        }
        if (arr.includes(2) && arr.includes(5) && arr.includes(8))
        {
            return "258";
        }
        if (arr.includes(3) && arr.includes(6) && arr.includes(9))
        {
            return "369";
        }

        return false;
    }

    if (smushAndCheck(p1Moves))
    {
        console.log("p1 wins")
        winnerFound = true;
        p1Wins++;
        status = "end";
        sendGameOver({ winState: smushAndCheck(p1Moves), message: playerNames[0] + " Wins!" });

    }
    else if (smushAndCheck(p2Moves))
    {
        winnerFound = true
        console.log("p2 wins");
        p2Wins++;
        status = "end";
        sendGameOver({ winState: smushAndCheck(p2Moves), message: playerNames[1] + " Wins!" });
    }
    else if (p1Moves.length + p2Moves.length >= 9)
    {
        // All boxes are full
        status = "end";
        sendGameOver({ winState: "0", message: "Everyone Loses!" })
    }
    return winnerFound;
}

function sendGameUpdate(boxNumber)
{
    io.emit('gameUpdate', { p1turn, box: boxNumber })
}

function sendGameError(str)
{
    io.emit('error', str);
}

function sendGameOver(str)
{
    io.emit('gameOver', str)
}

function restartGame()
{
    console.log("RESTART GAME")
    p1Moves = [];
    p2Moves = [];
    p1turn = true;
    status = "waiting";
    playerNames = [];
    p1Wins = 0;
    p2Wins = 0;

    io.emit('reset', true)
}

function rematchGame()
{
    console.log("Run it back!")
    p1Moves = [];
    p2Moves = [];
    status = "playing";
    p1turn = !p1turn;

    sendGameOver({ winState: null, message: null, winner: null })
    sendGameState()
}