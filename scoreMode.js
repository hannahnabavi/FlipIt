var scoreMode = {}
var cardsPerRow;
var cardSize;

var inGameInterval;

scoreMode.firstFrame = true;

scoreMode.screenText = 'Score mode value both time and accuracy.'

scoreMode.setup = function(){
  appState.gameState.matchMaking = {
    matching : [],
    matchCount: 0,
    totalTrial: 0
  };
  appState.gameState.score = {
    timerValue: 0,
    scores: []
  };
  appState.gameState.clickCheck = {
    onCard: false
  }

  cardsPerRow = getTheme(appState).cardsPerRow;
  cardSize = getTheme(appState).cardDimentions;
  appState.gameState.deck = makeDeck(appState.options.numberOfCards);
  shuffle(appState.gameState.deck, true);
}

scoreMode.draw = function(){
  background('darkorange');
  
  text('total trial:'+' '+ appState.gameState.matchMaking.totalTrial,400,50);
  text(Math.floor(appState.gameState.score.timerValue/10),400,400);

  drawDeck(appState.gameState.deck, 0, 0, cardLayout, appState.options.theme.layout.cardsPerRow, appState.options.theme.layout.spacing);  

  push();
  textAlign(CENTER);
  textSize(8);
  if(firstClick){
    text(scoreMode.screenText, width/2+170, height/2);
  }
  pop();
}

scoreMode.mousePressed = function(){
  clickToFlip(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
  clickToIndex(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
  findMatch(appState.gameState.matchMaking);
  if(firstClick === true){
    if(appState.gameState.clickCheck.onCard === true){
      startInGameTimer();
      console.log('timer Start');
    }
  }
  firstClick = false;
}

scoreMode.keyPressed = function(){
  
}