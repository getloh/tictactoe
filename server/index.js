const express = require('express')
const app = express()
const port = 3000

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// })

// app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// })
server.listen(3000);

let playerNames = [];
let p1Moves = [];
let p2Moves = [];
let p1turn = true;
let status = "waiting";     //"waiting" | "playing" | "end"

io.on('connection', (socket) =>
{
    console.log('User connected');
    sendGameState();

    socket.on('setName', (payload) =>
    {
        // uid + name
        console.log("setName =" + payload)
        if (playerNames.length <= 2)
        {
            playerNames.push(payload);
            if (playerNames.length == 2){
                status = "playing";
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
            if (p1Moves.includes(payload.box) || p2Moves.includes(payload.box))
            {
                console.log("this box has is already occupied");
                sendGameError("Space already occupied!");
            }
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
                p1turn = !p1turn;
            }

            gameUpdate();
            sendGameState();
        }

    });

    socket.on('restart', () => {
        restartGame();
    })

    socket.on('disconnect', () =>
    {
        console.log('User disconnected');
    });

});

function sendGameState()
{
    io.emit('gameState', { playerNames, p1Moves, p2Moves, p1turn, status })
}

function gameUpdate()
{
    //Determines game complete
    function smushAndCheck(arr)
    {
        //Takes an array of numbers, and checks for winning state
        let str = arr.sort().join('');
        // Lord forgive me for this bruteforce

        if (str.includes('1') && str.includes('2') && str.includes('3'))
        {
            return true;
        }
        if (str.includes('4') && str.includes('5') && str.includes('6'))
        {
            return true;
        }
        if (str.includes('7') && str.includes('8') && str.includes('9'))
        {
            return true;
        }
        if (str.includes('1') && str.includes('5') && str.includes('9'))
        {
            return true;
        }
        if (str.includes('3') && str.includes('5') && str.includes('7'))
        {
            return true;
        }
        if (str.includes('1') && str.includes('4') && str.includes('7'))
        {
            return true;
        }
        if (str.includes('2') && str.includes('5') && str.includes('8'))
        {
            return true;
        }
        if (str.includes('3') && str.includes('6') && str.includes('9'))
        {
            return true;
        }

        return false;
    }

    if (smushAndCheck(p1Moves))
    {
        console.log("p1 wins")
        sendGameOver(playerNames[0] + " Wins!")
    }
    else if (smushAndCheck(p2Moves))
    {
        console.log("p2 wins")
        sendGameOver(playerNames[1] + " Wins!")

    }
    else if (p1Moves.length + p2Moves.length >= 9)
    {
        // All boxes are full
        sendGameOver("Nobody wins :(")
    }
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
    status = "end";
}

function restartGame()
{
    console.log("RESTART GAME")
    p1Moves = [];
    p2Moves = [];
    p1turn = true;
    status = "waiting"; 
    playerNames = [];
}