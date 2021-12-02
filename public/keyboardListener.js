export function createKeyboardListener(document) {
  const state = {
    observers: [],
    playerId: null
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function unSubscribe(functionId){
    // console.log("Remove subscribe!");
    delete state.observers[functionId]
  }

  function notifyAll(command) {
    // console.log(`Notifying ${state.observers.length} observers`);

    state.observers.forEach((observerFunction) =>
      observerFunction(command)
    );
  }

  function registerPlayerId(playerId) {
    state.playerId = playerId
  }

  document.addEventListener("keyup", handleKeydown);
  function handleKeydown(event) {
    const keyPress = event.key;
    // console.log(event);
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