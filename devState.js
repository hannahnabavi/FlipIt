// devState.js
// this file is for you to edit while you're developing. It allows you to inject whatever gamestate you want the game to be on. You can jump straight to the middle of a game, with the deck in whatever state you wish, bypassing the startscreen, menuscreen and whatever setup you want. Thus saving you time. In the final game these setting will be changed in the game menus.

// devState.js changes often, but rarely should it be commited
// run `git update-index --assume-unchanged devState.js`
// for further details see: https://stackoverflow.com/a/18277622/4347968 

// Make sure you set `mode = "dev"` in sketch.js. If mode is not set to "dev", the game will start up on the start screen. 

function devState(state){
    state.currentScene = "inGame";
    state.options.numberOfCards = 16;
    state.options.theme = {
        cards: {
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

