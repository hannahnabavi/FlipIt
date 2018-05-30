var newthreedcard = {};

newthreedcard.firstFrame = true;

newthreedcard.setup = function () {
    appState.gameState.deck = makeDeck(appState.options.numberOfCards);
    loadTheme(appState.options.theme, appState);
    setupColorBuffer();
    setCamera();
};

newthreedcard.draw = function () {
    // orbitControl();
    background("lightgrey");
    drawDeck(appState.gameState.deck,  //this game's deck
             -200, -200, //the (x,y) of where to draw the deck
             themeMap[appState.options.themeName].cards.dimensions, //card dimensions.width/height
             cardLayout,
             themeMap[appState.options.themeName].layout.cardsPerRow,
             themeMap[appState.options.themeName].layout.spacing); //card spacing.horizontal/vertical
};

newthreedcard.mousePressed = function () {
        var card = getObject(mouseX, mouseY);
        console.log(card);
        if(card){
            toObj = card.faceUp ? {rot: 0, faceUp: false} : {rot: PI, faceUp: true};
            createjs.Tween.get(card, {override: true}).to(toObj, 300);
        }
}
