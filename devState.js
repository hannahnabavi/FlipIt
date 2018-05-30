// devState.js
// this file is for you to edit while you're developing. It allows you to inject whatever gamestate you want the game to be on. You can jump straight to the middle of a game, with the deck in whatever state you wish, bypassing the startscreen, menuscreen and whatever setup you want. Thus saving you time. In the final game these setting will be changed in the game menus.

// devState.js changes often, but rarely should it be commited
// run `git update-index --assume-unchanged devState.js`
// for further details see: https://stackoverflow.com/a/18277622/4347968 

// Make sure you set `mode = "dev"` in sketch.js. If mode is not set to "dev", the game will start up on the start screen. 

function devState(state){
    state.currentScene = "newthreedcard";
    state.options.themeName = "debugTheme";
    state.options.numberOfCards = 16;
    state.options.theme = {
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
      dimensions: {
         width: 75,
         height: 100
            }
        },
        layout: {
            cardsPerRow: 4,
            spacing: {horizontal: 10,
                      vertical: 10}
        }
    };
}

