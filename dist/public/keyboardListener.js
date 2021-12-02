"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const _createKeyboardListener = void 0;
// export { _createKeyboardListener as createKeyboardListener };
export function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    };
    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }
    function unSubscribe(functionId) {
        delete state.observers[functionId];
    }
    function notifyAll(command) {
        state.observers.forEach((observerFunction) => observerFunction(command));
    }
    function registerPlayerId(playerId) {
        state.playerId = playerId;
    }
    document.addEventListener("keyup", handleKeydown);
    function handleKeydown(event) {
        const keyPress = event.key;
        const command = {
            type: 'move-player',
            playerId: state.playerId,
            keyPress: keyPress,
        };
        notifyAll(command);
    }
    return {
        subscribe,
        registerPlayerId,
        unSubscribe
    };
}
// const _createKeyboardListener = createKeyboardListener;
// export { _createKeyboardListener as createKeyboardListener };
//# sourceMappingURL=keyboardListener.js.map