var threedcard = {};

threedcard.firstFrame = true;
threedcard.faces = [];
var democard = makeCard(0, 0, false, false);
threedcard.setup = function(){
    democard.rot = 0;

    threedcard.cardback = createGraphics(appState.options.theme.cards.dimensions.width, appState.options.theme.cards.dimensions.height);

    for (var r = 0; r < 6; r++){
        for (var c = 0; c < 6; c++){
            ((r + c) % 2 === 0) ? threedcard.cardback.fill("red") : threedcard.cardback.fill("green")
            threedcard.cardback.noStroke();
            threedcard.cardback.rect(r * threedcard.cardback.width/6, c * threedcard.cardback.height/6,
            threedcard.cardback.width/6, threedcard.cardback.height/6);
            threedcard.cardback.noFill();
            threedcard.cardback.stroke(5);
            threedcard.cardback.rect(0,0,threedcard.cardback.width - .5, threedcard.cardback.height - .5);
        }
    }

    for (var i = 0; i < appState.options.numberOfCards/2; i++){
        threedcard.faces[i] = createGraphics(appState.options.theme.cards.dimensions.width, appState.options.theme.cards.dimensions.height);
        threedcard.faces[i].background("white");
        threedcard.faces[i].fill("black");
        threedcard.faces[i].textSize(72);
        threedcard.faces[i].textAlign(CENTER);
        threedcard.faces[i].text(i, threedcard.faces[i].width/2, threedcard.faces[i].height * .75);
        threedcard.faces[i].noFill();
        threedcard.faces[i].stroke(5);
        threedcard.faces[i].rect(0,0,threedcard.faces[i].width - .5, threedcard.faces[i].height - .5);
    }
};

threedcard.draw = function(){
  var hover = false;
  background("lightgrey");

  



  push();
  translate(-width/2 + appState.options.theme.cards.dimensions.width/2, 
            -height/2 + appState.options.theme.cards.dimensions.height/2, 0);
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
  texture(threedcard.cardback);
  plane(appState.options.theme.cards.dimensions.width,appState.options.theme.cards.dimensions.height);
  pop();

  pop();
};

threedcard.mousePressed = function(){
    if (0 < mouseX && mouseX < appState.options.theme.cards.dimensions.width &&
        mouseY > 0 && appState.options.theme.cards.dimensions.height > mouseY) {
            createjs.Tween.get(democard).to({rot: PI}, 300, createjs.Ease.linear).onComplete(function(card){
                card.faceUp = true;
            })
        }
};



