var inGame = {}
var cardsPerRow;
var cardSize;

var matching = [];

inGame.firstFrame = true;

inGame.screenText = 'Scene: inGame!'

inGame.setup = function(){
  cardsPerRow = getTheme(appState).cardsPerRow;
  cardSize = getTheme(appState).cardDimentions;
  console.log('inGame setup function');
  appState.gameState.deck = makeDeck(appState.options.numberOfCards);
  shuffle(appState.gameState.deck, true);
}

inGame.draw = function(){
  push();
  background('darkorange')
  textAlign(CENTER);
  textSize(60);
  text(inGame. screenText, width/2, height/2);
  pop();

  //drawLable(mouseX, mouseY);

  drawDeck(appState.gameState.deck, 0, 0, cardLayout, appState.options.theme.layout.cardsPerRow, appState.options.theme.layout.spacing);  
}

clickToFlip = function(mouseX, mouseY, cardsPerRow, cardSize, deckSize, cardArray, spacing){
  var cords = getCords(mouseX, mouseY, cardsPerRow, cardSize, spacing, deckSize);
  var index = cords[0] + cardsPerRow*cords[1];
  if(cardArray[index].faceUp){
    cardArray[index].faceUp = false;
  }else{
    cardArray[index].faceUp = true;
  }
}

clickToIndex = function(mouseX, mouseY, cardsPerRow, cardSize, deckSize, cardArray, spacing){
  var cords = getCords(mouseX, mouseY, cardsPerRow, cardSize, spacing, deckSize);
  var index = cords[0] + cardsPerRow*cords[1];
  matching.push(cardArray[index]);
  return index;
}


getCords = function(mouseX, mouseY, cardsPerRow, cardSize, spacing, deckSize){
  var cords = [];
  //console.log(arguments)
  for(var i = 0; i < cardsPerRow; i++){
    if(cardSize.width * i + spacing.horizontal + spacing.horizontal * i < mouseX && mouseX < cardSize.width * i + cardSize.width + spacing.horizontal + spacing.horizontal * i){
      cords.push(i);
    }
  }
  for(var j = 0; j < deckSize; j++){
    if(cardSize.height * j + spacing.vertical + spacing.vertical * j < mouseY && mouseY < cardSize.height * j + cardSize.height + spacing.vertical + spacing.vertical * j){
      cords.push(j);
    }
  }
  //console.log(cords);
  return cords;
}

inGame.mousePressed = function(){
  clickToFlip(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
  clickToIndex(mouseX, mouseY, appState.options.theme.layout.cardsPerRow, appState.options.theme.cards.dimensions, appState.options.numberOfCards, appState.gameState.deck, appState.options.theme.layout.spacing);
  findMatch();

  appState.currentScene = 'inGame2';
}

inGame.keyPressed = function(){
  
}