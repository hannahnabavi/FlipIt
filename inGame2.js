var inGame2 = {};

inGame2.firstFrame = true;
inGame2.screenText = 'choose your second card';

inGame2.setup = function(){
    console.log('choose 2nd card');
}

inGame2.draw = function(){
    push();
    background('pink');
    textAlign(CENTER);
    textSize(40);
    //text(inGame2.screenText, width/2, 50);
    pop();

    text('total trial:'+' '+ toatlTrial,400,50);

    drawDeck(appState.gameState.deck, 0, 0, cardLayout, appState.options.theme.layout.cardsPerRow, appState.options.theme.layout.spacing);  
}

inGame2.mousePressed = function(){
    appState.currentScene = 'inGame';
    clickToFlip(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
    clickToIndex(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
    findMatch();    
}

inGame2.keyPressed = function(){

}

