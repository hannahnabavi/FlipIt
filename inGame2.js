var inGame2= {};
var cardsPerRow = 5;
var spacing=10;

inGame2.firstFrame=true;

inGame2.setup=function(){
deck =makeDeck(numberOfCards);
}

inGame2.screenText = "Scene: inGame2!"; //do this so that it is not global when you want each one has its own screen text


inGame2.mousePressed= function (){
    clickToFlip(mouseX,mouseY,cardsPerRow, cardInfo,numberOfCards,deck);
    clickToIndex(mouseX, mouseY, cardsPerRow, cardInfo, numberOfCards, deck);
}

inGame2.draw = function (){
     background("darkred");
    drawDeck(deck,cardsPerRow);
    makeLable(mouseX, mouseY);
}

inGame2.keyPressed =function (){};

makeLable = function(mouseX, mouseY){
    textSize(20);
    text(mouseX + "," + mouseY,mouseX + 10, mouseY);
}

clickToFlip = function(mouseX, mouseY, cardsPerRow, cardInfo, deckSize, cardArray){
    var cords = getCords(mouseX, mouseY, cardsPerRow, cardInfo, deckSize);
    var index = cords[0] + cardsPerRow*cords[1];
    if(cardArray[index].faceUp){
      cardArray[index].faceUp = false;
    }else{
      cardArray[index].faceUp = true;
    }
   }

   clickToIndex = function(mouseX, mouseY, cardsPerRow, cardInfo, deckSize, cardArray){
    var cords = getCords(mouseX, mouseY, cardsPerRow, cardInfo, deckSize);
    var index = cords[0] + cardsPerRow*cords[1];
    console.log(index);
    return index;
   }
   
   
   getCords = function(mouseX, mouseY, cardsPerRow, cardInfo, deckSize){
    var cords = [];
    for(var i = 0; i < cardsPerRow; i++){
      if(90*i+spacing < mouseX && mouseX < 90*i+spacing + cardInfo.width){
        cords.push(i);
      }
    }
    for(var j = 0; j < deckSize; j++){
      if((cardInfo.height+spacing)*j+spacing < mouseY && mouseY < (cardInfo.height+spacing)*j+spacing + cardInfo.height){
        cords.push(j);
      }
    }
    return cords;
   }

   