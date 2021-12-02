import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { createGame } from '../public/create-game.js'

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
let gameAddFruit = null



game.subscribe((command) => {
    // console.log(`> Emitting ${command.type}`);
    sockets.emit(command.type, command)
})


sockets.on('connection', (socket) => {
    const playerId = socket.id;
    // console.log(`Player connected on Server ${playerId}`)

    if(game.gameOver()) gameAddFruit = game.start()

    game.addPlayer({ playerId })

    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
        game.unSubscribe()

        if(game.gameOver()) game.stop(gameAddFruit)
    })

    socket.emit('setup', game.state)

    socket.on('move-player', (command) => {
        // console.log(command);
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })

   
})

server.listen(process.env.PORT || 3001, () => {
    console.log("> Sever listening on port: 3000");
})