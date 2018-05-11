var threedcard = {};

threedcard.firstFrame = true;
threedcard.faces = [];
threedcard.ZTABLE = 20;
var democard = makeCard(0, 0, false, false);
threedcard.setup = function(){
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1450);
    democard.rot = 0;

    appState.gameState.deck = threedcard.makeDeck(8);    
   shuffle(appState.gameState.deck, true);

    threedcard.cardBack = threedcard.loadBack(threedcard.debugTheme); 
    threedcard.faces = threedcard.loadFaces(threedcard.debugTheme,appState.options.numberOfCards)  
};

threedcard.draw = function(){
   
    orbitControl();
  var hover = false;
  background("lightgrey");

  push();
  translate(-width/2 + appState.options.theme.cards.dimensions.width/2, 
            -height/2 + appState.options.theme.cards.dimensions.height/2,
             0);
  //var loc = map(mouseX, 0, width, 0, PI);

  push();
  fill("blue");
  box(10,10,10);
  pop();

  rotateY(democard.rot);
  
  //front face
  push();
  translate(0, 0, -.015);
  stroke(3);
  rotateY(PI);
  texture(threedcard.faces[4]);
  plane(appState.options.theme.cards.dimensions.width,appState.options.theme.cards.dimensions.height);
  pop();

  //back face
  push();
  translate(0, 0, .015);
  texture(threedcard.cardBack);
  plane(appState.options.theme.cards.dimensions.width,appState.options.theme.cards.dimensions.height);
  pop();

  pop();

  
  
//   threedcard.drawCard(4, 20, 20, 0, PI, 75, 100, threedcard.cardBack, threedcard.faces);
//   threedcard.drawCard(1, 95, 20, 0, PI/4, 75, 100, threedcard.cardBack, threedcard.faces);
//   threedcard.drawCard(2, 170, 20, 0, PI/3, 75, 100, threedcard.cardBack, threedcard.faces);
//   threedcard.drawCard(3, 245, 20, 0, PI/2, 75, 100, threedcard.cardBack, threedcard.faces);

  threedcard.drawDeck(appState.gameState.deck, -200, -200, cardLayout, 4, {horizontal: 10, vertical: 15});
};

threedcard.drawDeck = function (arrOfCards, x, y, cardLayout, cardsPerRow, spacing){
    push();
    translate(x, y, threedcard.ZTABLE); 
    arrOfCards.forEach(function(card, index){
        var loc = cardLayout(index, cardsPerRow, spacing);
        threedcard.drawCard(card.face, loc.x, loc.y, threedcard.ZTABLE, PI, cardProperties.width, cardProperties.height, threedcard.cardBack, threedcard.faces);
    });
    pop();
}

threedcard.mousePressed = function(){
    if (0 < mouseX && mouseX < appState.options.theme.cards.dimensions.width &&
        mouseY > 0 && appState.options.theme.cards.dimensions.height > mouseY) {
            createjs.Tween.get(democard, {onComplete: function(card){
                card.faceUp = true;
            }}).to({rot: PI}, 300, createjs.Ease.linear)
        }
};

threedcard.makeCard = function (id, face, faceUp, matched, rot) {
        faceUp = faceUp ? faceUp : false;
        matched = matched ? matched : false;
        rot = rot ? rot : 0;
        return { id: id, face: face, faceUp: faceUp, matched: matched, rot: rot};
};

threedcard.makeDeck = function makeDeck(numberOfCards) {
    var result = [];
    for (var id = 0, face = 0; id < numberOfCards; face++) {
      result.push(threedcard.makeCard(id++, face, false));
      result.push(threedcard.makeCard(id++, face, false));
    }
    return result;
  }


threedcard.drawCard = function(face,x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces){
    push();
    translate(x,y,z);
    rotateY(rot);

    push();
    translate(0, 0, -.015);
    stroke(3);
    rotateY(PI);
    texture(cardFaces[face]);
    plane(cardWidth,cardHeight);
    pop();

    push();
    translate(0, 0, .015);
    texture(cardBack);
    plane(cardWidth,cardHeight);
    pop();

    pop();
}

threedcard.loadFaces = function (theme, numberOfCards){
  return theme.cards.drawFaces(numberOfCards);
}

threedcard.loadBack = function (theme) {
    return theme.cards.drawBack(theme);
}
    
threedcard.debugTheme = 
{ name: "debugTheme",
  cards: { 
        drawFaces: function (numberOfCards){
        faces = []

        for (var i = 0; i < numberOfCards/2; i++){
            faces[i] = createGraphics(threedcard.debugTheme.cards.dimensions.width, 
                                    threedcard.debugTheme.cards.dimensions.height);
            faces[i].background("white");
            faces[i].fill("black");
            faces[i].textSize(72);
            faces[i].textAlign(CENTER);
            faces[i].text(i, threedcard.debugTheme.cards.dimensions.width/2, threedcard.debugTheme.cards.dimensions.height * .75);
            faces[i].noFill();
            faces[i].stroke(5);
            faces[i].rect(0,0,threedcard.debugTheme.cards.dimensions.width - .5, threedcard.debugTheme.cards.dimensions.height - .5);
        }

        return faces;
        },
        drawBack: function(theme){
        var cardback = createGraphics(theme.cards.dimensions.width, 
            theme.cards.dimensions.height);
        
        for (var r = 0; r < 6; r++){
            for (var c = 0; c < 6; c++){
                ((r + c) % 2 === 0) ? cardback.fill("red") : cardback.fill("green")
                cardback.noStroke();
                cardback.rect(r * cardback.width/6, c * cardback.height/6,
                cardback.width/6, cardback.height/6);
                cardback.noFill();
                cardback.stroke(5);
                cardback.rect(0,0, cardback.width - .5, cardback.height - .5);
            }
        }

        return cardback;
      },
      dimensions: {width: 75, height: 100}   
    }
}


