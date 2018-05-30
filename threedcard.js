var threedcard = {};

threedcard.firstFrame = true;
threedcard.faces = [];
threedcard.ZTABLE = 20;

var democard = makeCard(0, 0, false, false);

threedcard.setup = function(){
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1450);
    democard.rot = 0;

    threedcard.colorBuffer = createGraphics(width, height, WEBGL);
    threedcard.colorBuffer.pixelDensity(1);
    threedcard.colorBuffer.show();
    threedcard.colorBuffer.style("display", "inline");
    threedcard.colorBuffer.background("lightBlue");
    threedcard.colorBuffer.ortho(-width / 2, width / 2, -height / 2,  height / 2, 0, 1450);


    appState.gameState.deck = threedcard.makeDeck(appState.options.numberOfCards);
   shuffle(appState.gameState.deck, true);

    threedcard.cardBack = threedcard.loadBack(threedcard.debugTheme);
    threedcard.faces = threedcard.loadFaces(threedcard.debugTheme,appState.options.numberOfCards)  
};

threedcard.draw = function(){
   
  orbitControl();
  background("lightgrey");

  threedcard.drawDeck(appState.gameState.deck, -200, -200, appState.options.theme.cards.dimensions, cardLayout, 4, {horizontal: 10, vertical: 15});
};

threedcard.drawDeck = function (arrOfCards, x, y, cardProperties, cardLayout, cardsPerRow, spacing){
    threedcard.colorBuffer.push();
    push();
    translate(x, y, threedcard.ZTABLE); 
    threedcard.colorBuffer.translate(x, y, threedcard.ZTABLE);

    arrOfCards.forEach(function(card, index){
        var loc = cardLayout(index, cardsPerRow, spacing);
        threedcard.drawCard(card.face, loc.x, loc.y, threedcard.ZTABLE, card.rot, cardProperties.width, cardProperties.height, threedcard.cardBack, threedcard.faces);
        threedcard.drawCardColorBuffer(card.face, loc.x, loc.y, threedcard.ZTABLE, card.rot, cardProperties.width, cardProperties.height, threedcard.cardBack, threedcard.faces, threedcard.colorBuffer, card.col);
    });
    pop();
    threedcard.colorBuffer.pop();
}

threedcard.mousePressed = function(){
    if (0 < mouseX && mouseX < appState.options.theme.cards.dimensions.width &&
        mouseY > 0 && appState.options.theme.cards.dimensions.height > mouseY) {
            createjs.Tween.get(democard, {onComplete: function(card){
                card.faceUp = true;
            }}).to({rot: PI}, 300, createjs.Ease.linear);
        }
};

threedcard.makeCard = function (id, face, faceUp, matched, rot, col) {
        faceUp = faceUp ? ((rot = PI) && true) : ((rot = 0) || false);
        matched = matched ? matched : false;
        rot = rot !== 0 ? PI : 0;
        col = col ? col : 255 - (id * 5); 
        return { id: id, face: face, faceUp: faceUp, matched: matched, rot: rot, col: col};
};

threedcard.makeDeck = function makeDeck(numberOfCards) {
    var result = [];
    for (var id = 0, face = 0; id < numberOfCards; face++) {
      result.push(threedcard.makeCard(id++, face, false));
      result.push(threedcard.makeCard(id++, face, false));
    }
    return result;
  }


threedcard.drawCard = function(face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces){
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

threedcard.drawCardColorBuffer = function (face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces, gc, col){
    gc.push();
    gc.translate(x,y,z);
    // gc.translate(x, y, -20)
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

/* This function loads the pixels of the color buffer canvas into an array 
		called pixels and returns them. */
        function getPixels() {
            var gl = threedcard.colorBuffer.elt.getContext('webgl');
            var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            return (pixels);
        }
/* This function gets the red channel of the pixel under the mouse as 
		the index for the corresponding object. A more advanced version 
		 could use the 4 bytes (see commented section) */
        function getObject(mx, my) {
            if (mx > width || my > height) {
                return 0;
            }
        
            var gl = threedcard.colorBuffer.elt.getContext('webgl');
            var pix = getPixels();
        
            var index = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);
        
            var col = pix[index]; // Only returning the red channel as the object index.
            var found = appState.gameState.deck.find(function(element){
            return element.col === col;
            })
            return found;
        }
        
threedcard.mousePressed = function (){
    var card = getObject(mouseX, mouseY);
    console.log(card);
    if(card){
    toObj = card.faceUp ? {rot: 0, faceUp: false} : {rot: PI, faceUp: true};
    createjs.Tween.get(card, {override: true}).to(toObj, 300);
    }
}
