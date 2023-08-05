//Main.JS - script for index.html

let socket = io();

const id = Math.floor(Math.random() * 10000000);

let form = document.getElementById('form');
let nameInput = document.getElementById('nameInput');
let statusText = document.getElementById('status');
let yourName = document.getElementById('yourname');
let opponentName = document.getElementById('opponentname');

let gameState;
let registeredName;
let opponentsName;
let playerNumber = 0;

form.addEventListener('submit', function (e)
{
    e.preventDefault();
    if (nameInput.value)
    {
        socket.emit('setName', nameInput.value);
        // nameInput.value = '';
        registeredName = nameInput.value;
        yourName.innerHTML = nameInput.value;
        form.classList.add("hide");
        statusText.innerHTML = "Waiting for other player..."
    }
});


function onBoxClick(param)
{
    console.log("box clicked!" + param)
    //whose turn?
    if (playerNumber == 0 && gameState.p1turn){
        socket.emit('gameAction', { id: id, box: param });
    }
    else if (playerNumber == 1 && !gameState.p1turn){
        socket.emit('gameAction', { id: id, box: param });
    }
    else {
        return;
    }
}


socket.on('gameState', (payload) =>
{
    //Runs every 'tick'
    console.log(payload)
    gameState = payload;

    if (gameState.status == "playing")
    {
        statusText.innerHTML = `Playing! It is ${gameState.p1turn ? gameState.playerNames[0] : gameState.playerNames[1]}'s turn`
        playerNumber = gameState.playerNames.indexOf(registeredName)

        if (opponentsName == undefined){
            opponentName.innerHTML = gameState.playerNames[playerNumber == 1 ? 0 : 1]
        }
    }
    if (gameState.status == "end")
    {
        statusText.innerHTML = "Game over!"
    }
});

socket.on('error', (err) =>
{
    console.log(err);
    //TODO: Error stuff
})

socket.on('gameUpdate', (gameUpdate) =>
{
    //Runs when a box changes
    console.log(gameUpdate);
    if (gameUpdate.p1turn)
    {
        updateBoxCross(gameUpdate.box)
    }
    else
    {
        updateBoxCircle(gameUpdate.box)
    }
})

function updateBoxCross(num)
{
    let element = document.getElementById("box" + num);
    element.classList.add("cross");
}
function updateBoxCircle(num)
{
    let element = document.getElementById("box" + num);
    element.classList.add("circle");
}

socket.on('gameOver', (str) =>
{
    console.log(str);
    let element = document.getElementById("gameover");
    let winner = document.getElementById("winner");
    winner.innerHTML = str
    element.classList.add("show");
})

function restartGame()
{
    console.log("try restart")
    let gameover = document.getElementById("gameover");
    gameover.classList.remove("show")
    socket.emit('restart', "restartgame");
    location.reload();
}
