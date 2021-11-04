import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { createGame } from '../public/create-game.js'

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`);
    sockets.emit(command.type, command)
})


sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`Player connected on Server ${playerId}`)

    game.addPlayer({ playerId })
    console.log(game.state);

    socket.on('disconnect', () => {
        game.removePlayer({ playerId })
        game.unSubscribe()
    })

    socket.emit('setup', game.state)

    socket.on('move-player', (command) => {
        console.log(command);
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })

   
})



server.listen(3000, () => {
    console.log("> Sever listening on port: 3000");
})