function getDeck(state){
    return state.gameState.deck;
}

function getNumberOfCards(state){
    return state.options.numberOfCards;
}

function loadTheme(themeName, state){
    var theme = themeMap[themeName];
    state.gameState.theme = {};
    state.gameState.theme.back = loadBack(theme);
    state.gameState.theme.faces = loadFaces(theme, appState.options.numberOfCards);
}

