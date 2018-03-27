
var inGame= {};
var cardsPerRow =5;
var spacing=10;

inGame.firstFrame=true;

inGame.setup=function(){
deck =makeDeck(numberOfCards);
fill("blue");
ellipse(100,100,100,100);
console.log("in setup!");
}

inGame.screenText = "Scene: inGame!"; //do this so that it is not global when you want each one has its own screen text


inGame.mousePressed= function (){
    //currentScene = "startScreen";
    clickToFlip(mouseX,mouseY,cardsPerRow, cardInfo,numberOfCards,deck);
    clickToIndex(mouseX, mouseY, cardsPerRow, cardInfo, numberOfCards, deck);
}

inGame.draw = function (){
     background("darkred");
    textAlign(CENTER);
    textSize(30);
    text(inGame.screenText, width/2, height/2);

    drawDeck(deck,cardsPerRow);
    makeLable(mouseX, mouseY);
   checkMatch({id:1,face:0,faceUp:true, matched: true, invisible: false},
    {id:2,face:0,faceUp:true, matched: true, invisible: false}); //input firstCard and secondCard. thats why it is not working rn
 matchCards({id:1,face:0,faceUp:true, matched: true, invisible: false},
    {id:2,face:0,faceUp:true, matched: true, invisible: false}); //input firstCard and secondCard. thats why it is not working rn
    makeInvisible({id:1,face:0,faceUp:true, matched: true, invisible: false},
        {id:2,face:0,faceUp:true, matched: true, invisible: false});
}

inGame.keyPressed =function (){};

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

   
  // {id: 4, face: 1, faceUp: false, matched: false}

  checkMatch = function(firstCard,secondCard){
    return firstCard.face == secondCard.face && firstCard.id !== secondCard.id;
  }

  matchCards =function(firstCard,secondCard){
       firstCard.matched = true; 
        secondCard.matched =true;
  }
//add a new aspect to the object: invisiblity. If they don't match, flip back

//make invisible start out as false
makeInvisible = function(firstCard,secondCard){
firstCard.invisible = true;
secondCard.invisible = true;
};

// if (checkMatch(fs,sc)){
//     matchCards(fs,sc);
//     makeInvisible(fs,sc);
// }

//then later have a function that says, if the invisible is true, 
//then actually make them disapear using tweening