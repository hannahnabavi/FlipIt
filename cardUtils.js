//necessary functions --> makeCard(face,id) -returns a card object
//makeDeck(num) ---> return array of paired (with faces matched) card objects
//shuffle(arrOfCards) ---> return array of cards but shuffled
//drawCard(card) 
//drawDeck(arrOfCards)


//typical {id: 4, face: 1, faceUp: false, matched: false}

var cardArray =[
    {id:1,face:0,faceUp:true, matched: true, invisible: false},
    {id:2,face:0,faceUp:true, matched: true, invisible: false},
    {id:3,face:1,faceUp:true, matched: true, invisible: false},
    {id:4,face:1,faceUp:true, matched: true, invisible: false},
    {id:5,face:2,faceUp:true, matched: true, invisible: false},
    {id:6,face:2,faceUp:true, matched: true, invisible: false},
    {id:7,face:3,faceUp:true, matched: true, invisible: false},
    {id:8,face:3,faceUp:true, matched: true, invisible: false}
]
var cardInfo = {width:80, height:125 ,stroke:1};

function makeCard(id,face,faceUp,matched,invisible){ //- returns a single card object with the respective face and id
faceUp =faceUp ?faceUp : false;
matched =matched ? matched :false;
return {id: id, face: face, faceUp: faceUp, matched: matched,invisible: invisible};
}

function makeCardFull(id,face,faceUp,matched,invisible){
    if(faceUp === undefined){
        faceUp =false;
    }
    if(matched === undefined) {
        matched =false;
    }
}

function makeDeck(numberOfCards){ //- returns an array of paired card objects
var arr=[];
for(var f=0, i=0; i<numberOfCards; f++){
   arr.push(makeCard(i++,f,true));
  arr.push(makeCard(i++,f,true));
}
return arr;
}



function drawCard(card,x,y,cardWidth,cardHeight,cardStroke){
push();
translate(x,y);
if(card.faceUp){
fill("white");
stroke(cardStroke);
rect(0,0,cardWidth,cardHeight,8);
textSize(32);
textAlign(CENTER,CENTER);
fill("black");
text(card.face,cardWidth/2,cardHeight/2);
}else{ 
    fill("grey");
    rect(0,0,cardWidth, cardHeight,15);
}
pop();
}

//lofi instructions:
//1. start at the top corner and place the first card
//2. place second card to the right of the first card
//3. repeat until you reach the cardsPerRow
//4. then, start all the way from the left again but lower down
//5. continue steps 2-4

//when col is 0, you are to the left

function cardLayout(index,cardsPerRow){
    var y;
    var x;
  var row= Math.floor(index/cardsPerRow);
   var col= index % cardsPerRow;
  x=col*cardInfo.width+10+col*10;
 y=row*cardInfo.height+10+row*10;

return [x,y];

}
          


function drawDeck(arrOfCards,cardsPerRow){
    arrOfCards.forEach(function(card,index){
        var loc =cardLayout(index,cardsPerRow);
        drawCard(card,loc[0],loc[1],cardInfo.width,cardInfo.height,cardInfo.stroke);
    });
}