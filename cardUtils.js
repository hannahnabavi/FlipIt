var cardProperties = {width: 75, height: 100, stroke: 1};
var cardLayoutProperites = {cardsPerRow: 4, spacing: 8}

function makeCard(id, face, faceUp, matched) {
  faceUp = faceUp ? faceUp : false;
  matched = matched ? matched : false;
  return { id: id, face: face, faceUp: faceUp, matched: matched };
}

function makeDeck(numberOfCards) {
  var result = [];
  for (var id = 0, face = 0; id < numberOfCards; face++) {
    result.push(makeCard(id++, face, true));
    result.push(makeCard(id++, face, true));
  }
  return result;
}

function drawCard(card, x, y, cardWidth, cardHeight, cardStroke){
    push();
    translate(x, y);
    if (card.faceUp){
        stroke(cardStroke);
        rect(0,0,cardWidth, cardHeight, 8);
        textSize(84);
        textAlign(CENTER, CENTER);
        fill("black")
        text(card.face, cardWidth/2, cardHeight/2);
    } else {
        fill("grey");
        rect(0,0,cardWidth, cardHeight, 8);
    }
    pop();
}

function cardLayout(i, cardsPerRow, spacing){
     var x, y;
     var row  = floor(i/cardsPerRow);
     var col = i % cardsPerRow; 
     
     x = col * cardProperties.with + spacing + col * spacing
     y = cardProperties.height * row + row * spacing;

    return {x: x, y: y};
}

function drawDeck(arrOfCards, x, y, cardLayout, cardsPerRow, spacing){
    push();
    translate(x, y);
    arrOfCards.forEach(function(card, index){
        var loc = cardLayout(index, cardsPerRow, spacing);
        drawCard(card, loc.x, loc.y, cardProperties.width, cardProperties.height, cardProperties.stroke);
    });
    pop();
}

