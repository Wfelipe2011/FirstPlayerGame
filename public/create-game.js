export function createGame() {
  
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };

    const observers = []

    function start() {
        const frequency = 3500
        return setInterval(addFruit, frequency)
    }

    function stop(value) {
        clearInterval(value)
    }

    function gameOver() {
        const listPlayers = Object.getOwnPropertyNames(state.players)
        return Boolean(!listPlayers.length)
    }

    function subscribe(observerFunction) {
        console.log({ observerFunction });
        observers.push(observerFunction);
    }
    function unSubscribe() {
        state.observers = []
    }

    function notifyAll(command) {
        console.log(`Notifying ${observers.length} observers`);

        observers.forEach((observerFunction) =>
            observerFunction(command)
        );
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer({ playerId, x, y }) {
        state.players[playerId] = {
            x: x ? x : Math.floor(Math.random() * state.screen.width),
            y: y ? y : Math.floor(Math.random() * state.screen.height),
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            x: state.players[playerId].x,
            y: state.players[playerId].y
        })
    }

    function removePlayer({ playerId }) {
        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function addFruit(command) {

        const idFruit = command?.fruitId ? command?.fruitId : Math.floor(Math.random() * 1000000000000000000)
        state.fruits[idFruit] = {
            x: command?.x ? command?.x : Math.floor(Math.random() * state.screen.width),
            y: command?.y ? command?.y : Math.floor(Math.random() * state.screen.height),
        };

        notifyAll({
            type: 'add-fruit',
            fruitId: idFruit,
            x: state.fruits[idFruit].x,
            y: state.fruits[idFruit].y
        })
    }

    function removeFruit(command) {
        const { fruitId } = command
        delete state.fruits[fruitId];
        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        })
    }

    function movePlayer(command) {
        notifyAll(command)
        const { playerId, keyPress } = command
        console.log(`Moving ${playerId} with ${keyPress}`);

        const acceptedMoves = {
            ArrowUp: (player) => player.y - 1 >= 0 && (player.y = player.y - 1),
            ArrowDown: (player) => player.y + 1 < state.screen.height && (player.y = player.y + 1),
            ArrowRight: (player) =>
                player.x + 1 < state.screen.width && (player.x = player.x + 1),
            ArrowLeft: (player) => player.x - 1 >= 0 && (player.x = player.x - 1),
        };

        const player = state.players[playerId];
        const moveFunction = acceptedMoves[keyPress];

        if (player && moveFunction) {
            moveFunction(player);
            checkkedForFruitCollition({ playerId });
        }
    }



    function checkkedForFruitCollition({ playerId }) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];

            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId });
            }
        }
    }

    return {
        movePlayer,
        state,
        subscribe,
        setState,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        start,
        unSubscribe,
        stop,
        gameOver
    };
}