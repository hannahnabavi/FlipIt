var debugTheme = {};

debugTheme = {
    name: "debugTheme",
    cards: {
        drawFaces: function(numberOfCards) {
            faces = []

            for (var i = 0; i < numberOfCards / 2; i++) {
                faces[i] = createGraphics(debugTheme.cards.dimensions.width,
                    debugTheme.cards.dimensions.height);
                faces[i].background("white");
                faces[i].fill("black");
                faces[i].textSize(72);
                faces[i].textAlign(CENTER);
                faces[i].text(i, debugTheme.cards.dimensions.width / 2, debugTheme.cards.dimensions.height * .75);
                faces[i].noFill();
                faces[i].stroke(5);
                faces[i].rect(0, 0, debugTheme.cards.dimensions.width - .5, debugTheme.cards.dimensions.height - .5);
            }

            return faces;
        },
        drawBack: function(theme) {
            var cardback = createGraphics(debugTheme.cards.dimensions.width,
                debugTheme.cards.dimensions.height);

            for (var r = 0; r < 6; r++) {
                for (var c = 0; c < 6; c++) {
                    ((r + c) % 2 === 0) ? cardback.fill("lightgreen"): cardback.fill("white")
                    cardback.noStroke();
                    cardback.rect(r * cardback.width / 6, c * cardback.height / 6,
                        cardback.width / 6, cardback.height / 6);
                    cardback.noFill();
                    cardback.stroke(5);
                    cardback.rect(0, 0, cardback.width - .5, cardback.height - .5);
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
        spacing: {
            horizontal: 10,
            vertical: 10
        }
    },
    background: "lightgrey"
};
