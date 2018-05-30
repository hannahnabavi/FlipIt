var cardProperties = {width: 75, height: 100, stroke: 1};
var cardLayoutProperites = {cardsPerRow: 4, spacing: 8};
var ZTABLE = 200;

var makeCard = function (id, face, faceUp, matched, rot, col) {
    faceUp = faceUp ? ((rot = PI) && true) : ((rot = 0) || false);
    matched = matched ? matched : false;
    rot = rot !== 0 ? PI : 0;
    col = col ? col : 255 - (id * 5); 
    return { id: id, face: face, faceUp: faceUp, matched: matched, rot: rot, col: col};
};

var makeDeck = function (numberOfCards) {
    var result = [];
    for (var id = 0, face = 0; id < numberOfCards; face++) {
        result.push(makeCard(id++, face, false));
        result.push(makeCard(id++, face, false));
    }
    shuffle(result, true);
    return result;
}

var drawCard = function(face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces){
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

var drawCardColorBuffer = function (face, x, y, z, rot, cardWidth, cardHeight, cardBack, cardFaces, gc, col){
    gc.push();
    // gc.translate(x,y,z);
    gc.translate(x, y, -200)
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

function cardLayout(i, cardsPerRow, spacing){
     var x, y;
     var row  = floor(i/cardsPerRow);
     var col = i % cardsPerRow;

     x = col * appState.options.theme.cards.dimensions.width + spacing.horizontal + col * spacing.horizontal
     y = appState.options.theme.cards.dimensions.height * row + spacing.vertical + row * spacing.vertical;

    return {x: x, y: y};
}

/* This function loads the pixels of the color buffer canvas into an array
		called pixels and returns them. */
        function getPixels() {
            var gl = appState.gameState.colorBuffer.elt.getContext('webgl');
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

            var gl = appState.gameState.colorBuffer.elt.getContext('webgl');
            var pix = getPixels();

            var index = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);
        
            var col = pix[index]; // Only returning the red channel as the object index.
            var found = appState.gameState.deck.find(function(element){
            return element.col === col;
            })
            return found;
        }

var setupColorBuffer = function (){
    var colorBuffer = createGraphics(width, height, WEBGL);
    colorBuffer.pixelDensity(1);
    colorBuffer.ortho(-width / 2, width / 2, -height / 2,  height / 2, 0, 1450);
    if (mode === "dev"){
    colorBuffer.show();
    colorBuffer.style("display", "inline");
    }
    colorBuffer.background("blue");
    appState.gameState.colorBuffer = colorBuffer;
}

var drawDeck = function (arrOfCards, x, y, cardProperties, cardLayout, cardsPerRow, spacing){
    if (mode === "dev" && !appState.gameState.colorBuffer){
        throw "ColorBuffer not found! Call setupColorBuffer in your setup function!"
    }
    appState.gameState.colorBuffer.push();
    push();
    
    translate(x, y, ZTABLE); 
    appState.gameState.colorBuffer.translate(x, y, ZTABLE);

    arrOfCards.forEach(function(card, index){
        var loc = cardLayout(index, cardsPerRow, spacing);
        drawCard(card.face, loc.x, loc.y, ZTABLE, card.rot, cardProperties.width, cardProperties.height, appState.gameState.theme.back, appState.gameState.theme.faces);
        drawCardColorBuffer(card.face, loc.x, loc.y, ZTABLE, card.rot, cardProperties.width, cardProperties.height, appState.gameState.theme.back, appState.gameState.theme.faces,appState.gameState.colorBuffer, card.col);
    });
    pop();
    appState.gameState.colorBuffer.pop();
}

var loadFaces = function (theme, numberOfCards){
    return themeMap[appState.options.themeName].cards.drawFaces(numberOfCards);
}

var loadBack = function (theme) {
    return themeMap[appState.options.themeName].cards.drawBack(theme);
}

function setCamera(){
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1450);
}
