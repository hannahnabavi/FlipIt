function getDeck(state){
    return state.gameState.deck;
}

function getNumberOfCards(state){
    return state.options.numberOfCards;
}

function getTheme(state){
    return state.options.theme
}