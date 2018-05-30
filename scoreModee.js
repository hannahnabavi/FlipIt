var scoreModee = {};

scoreModee.firstFrame = true;
scoreModee.faces = [];
scoreModee.ZTABLE = 20;

var democard = makeCard(0, 0, false, false);
var inGameInterval;

scoreModee.setup = function(){
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1450);
    democard.rot = 0;
    
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

    scoreModee.colorBuffer = createGraphics(500, 500, WEBGL);
    scoreModee.colorBuffer.pixelDensity(1);
    scoreModee.colorBuffer.show();
    scoreModee.colorBuffer.style("display", "inline");
    scoreModee.colorBuffer.background("lightBlue");
    scoreModee.colorBuffer.ortho(-width / 2, width / 2, -height / 2,  height / 2, 0, 1450);


    appState.gameState.deck = scoreModee.makeDeck(16);    
    shuffle(appState.gameState.deck, true);

    scoreModee.cardBack = scoreModee.loadBack(scoreModee.debugTheme); 
    scoreModee.faces = scoreModee.loadFaces(scoreModee.debugTheme,appState.options.numberOfCards)  

    appState.gameState.previousScene = 'scoreModee';
};

scoreModee.draw = function(){
//   orbitControl();
  background("lightgrey");

  scoreModee.drawDeck(appState.gameState.deck, -200, -200, cardLayout, 4, {horizontal: 10, vertical: 15});
};

scoreModee.drawDeck = function (arrOfCards, x, y, cardLayout, cardsPerRow, spacing){
    scoreModee.colorBuffer.push();
    push();
    translate(x, y, scoreModee.ZTABLE); 
    scoreModee.colorBuffer.translate(x, y, scoreModee.ZTABLE);

    arrOfCards.forEach(function(card, index){
        var loc = cardLayout(index, cardsPerRow, spacing);
        scoreModee.drawCard(card.face, loc.x, loc.y, scoreModee.ZTABLE, card.rot, cardProperties.width, cardProperties.height, scoreModee.cardBack, scoreModee.faces);
        scoreModee.drawCardColorBuffer(card.face, loc.x, loc.y, scoreModee.ZTABLE, card.rot, cardProperties.width, cardProperties.height, scoreModee.cardBack, scoreModee.faces, scoreModee.colorBuffer, card.col);
    });
    pop();
    scoreModee.colorBuffer.pop();
}

scoreModee.makeCard = function (id, face, faceUp, matched, rot, col) {
        faceUp = faceUp ? ((rot = PI) && true) : ((rot = 0) || false);
        matched = matched ? matched : false;
        rot = rot !== 0 ? PI : 0;
        col = col ? col : 255 - (id * 5); 
        return { id: id, face: face, faceUp: faceUp, matched: matched, rot: rot, col: col};
};

scoreModee.makeDeck = function makeDeck(numberOfCards) {
    var result = [];
    for (var id = 0, face = 0; id < numberOfCards; face++) {
      result.push(scoreModee.makeCard(id++, face, false));
      result.push(scoreModee.makeCard(id++, face, false));
    }
    return result;
  }


scoreModee.drawCard = function(face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces){
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

scoreModee.drawCardColorBuffer = function (face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces, gc, col){
    gc.push();
    // gc.translate(x,y,z);
    gc.translate(x, y, -20)
    gc.rotateY(rot);

    gc.push();
    gc.translate(0, 0, -.015);
    gc.stroke(3);
    gc.rotateY(PI);
    // gc.texture(cardFaces[face]);
    gc.fill([col, 0, 0]);
    gc.plane(cardWidth,cardHeight);
    gc.pop();

    gc.push();
    gc.translate(0, 0, .015);
    // gc.texture(cardBack);
    gc.fill([col, 0, 0]);
    gc.plane(cardWidth,cardHeight);
    gc.pop();

    gc.pop();
}

/* This function loads the pixels of the color buffer canvas into an array 
		called pixels and returns them. */
        function getScorePixels() {
            var gl = scoreModee.colorBuffer.elt.getContext('webgl');
            var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return (pixels);
        }
/* This function gets the red channel of the pixel under the mouse as 
		the index for the corresponding object. A more advanced version 
		 could use the 4 bytes (see commented section) */
        function getScoreObject(mx, my) {
            if (mx > width || my > height) {
                return 0;
            }
        
            var gl = scoreModee.colorBuffer.elt.getContext('webgl');
            var pix = getScorePixels();
        
            var index = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);
        
            var col = pix[index]; // Only returning the red channel as the object index.
            var found = appState.gameState.deck.find(function(element){
            return element.col === col;
            })
            return found;
        }

scoreModee.loadFaces = function (theme, numberOfCards){
  return theme.cards.drawFaces(numberOfCards);
}

scoreModee.loadBack = function (theme) {
    return theme.cards.drawBack(theme);
}
    
scoreModee.debugTheme = 
{ name: "debugTheme",
  cards: { 
        drawFaces: function (numberOfCards){
        faces = []

        for (var i = 0; i < numberOfCards/2; i++){
            faces[i] = createGraphics(scoreModee.debugTheme.cards.dimensions.width, 
                                    scoreModee.debugTheme.cards.dimensions.height);
            faces[i].background("white");
            faces[i].fill("black");
            faces[i].textSize(72);
            faces[i].textAlign(CENTER);
            faces[i].text(i, scoreModee.debugTheme.cards.dimensions.width/2, scoreModee.debugTheme.cards.dimensions.height * .75);
            faces[i].noFill();
            faces[i].stroke(5);
            faces[i].rect(0,0,scoreModee.debugTheme.cards.dimensions.width - .5, scoreModee.debugTheme.cards.dimensions.height - .5);
        }

        return faces;
        },
        drawBack: function(theme){
        var cardback = createGraphics(theme.cards.dimensions.width, 
            theme.cards.dimensions.height);
        
        for (var r = 0; r < 6; r++){
            for (var c = 0; c < 6; c++){
                ((r + c) % 2 === 0) ? cardback.fill("lightgreen") : cardback.fill("white")
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
        
scoreModee.mousePressed = function (){
    var card = getScoreObject(mouseX, mouseY);
    console.log(card);
    if(card){
        if(card.matched === false){
            toObj = card.faceUp ? {rot: 0, faceUp: false} : {rot: PI, faceUp: true};
            createjs.Tween.get(card).to(toObj, 300);
            appState.gameState.matchMaking.matching.push(card);
            appState.gameState.clickCheck.onCard = true;
            findMatch(appState.gameState.matchMaking);
        }
    }
    if(firstClick === true){
        if(appState.gameState.clickCheck.onCard === true){
             startInGameTimer();
             console.log('timer Start');
        }
    }
    firstClick = false;
}
