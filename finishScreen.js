var finishScreen = {};
var placeName = [
    '1ST PLACE:',
    '2ST PLACE:',
    '3ST PLACE:',
    '4ST PLACE:',
    '5ST PLACE:',
    '6ST PLACE:',
    '7ST PLACE:',
    '8ST PLACE:',
    '9ST PLACE:',
    '10ST PLACE:',
    '11ST PLACE:',
    '12ST PLACE:',
    '13ST PLACE:'    
]

var myFont;
finishScreen.firstFrame = true;

finishScreen.setup = function(){
    if(appState.gameState.score.scores.length >= 1){
        sortScoreBoard();
    }
    t = createGraphics(500,500);
    loadText();
}

function loadText(){
    push();
    //t.textFont(myFont);
    t.background('darkorange');
    t.textSize(40);
    t.textAlign(CENTER); 
    t.text('game finished!',width/2,50);
    t.textSize(30);
    t.text('click to restart', width/2, 450);
    textSize(20);
    for(var i = 0; i<appState.gameState.score.scores.length; i++){
        t.text(placeName[i] + appState.gameState.score.scores[i], width/2, 100 + 40 * i );
        console.log('write' + i + 'score');
    }
    pop();
}


finishScreen.draw = function(){
    push();
    translate(0,0, 100);
    texture(t);
    plane(500,500);
    pop();
}

finishScreen.mousePressed = function(){
    restart();
}

finishScreen.keyPressed = function(){
    restart();
}

function restart() {
    appState.currentScene = appState.gameState.previousScene;
    appState.gameState.matchMaking.matchCount = 0;
    appState.gameState.matchMaking.totalTrial = 0;
    appState.gameState.score.timerValue = 0;
    appState.gameState.clickCheck.onCard = false;
    clearInterval(inGameInterval);
    firstClick = true;
    console.log('reset matchCount to' + appState.gameState.matchMaking.matchCount);
    console.log('reset totalTrial to' + appState.gameState.matchMaking.totalTrial);
    console.log('reset timer to' + appState.gameState.score.timerValue);
    
    appState.gameState.deck = threedcard.makeDeck(16);
    shuffle(appState.gameState.deck, true);
    finishScreen.firstFrame = true;
}
