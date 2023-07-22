# Socket.io Tic-tac-toe speedrun

This is a (hastily made) multiplayer Tic-tac-toe game made using Express and socket.io.
It looks fairly hideous, but please bare in mind it was made in a few hours as part of a technical interview/coding test.

## Installation and use

clone and then `npm install` followed by `npm run dev`, or `node index.js`.

Then visit http://localhost:3000.
The game will not start until 2 players have connected and entered their names.

## Other notes

Weird things happen if you refresh, a third person connects, you connect in progress, etc.
The game state fully communicates the state of the board, but only new moves are reflected in the JS.

## Screenshots

![https://github.com/getloh/tictactoe/blob/main/public/screenshot.png?raw=true](https://github.com/getloh/tictactoe/blob/main/public/screenshot.png?raw=true)
