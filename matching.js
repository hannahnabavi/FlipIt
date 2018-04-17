
findMatch = function(){
    var firstCard = matching[matching.length-2];
    var secondCard = matching[matching.length-1];
      if(firstCard.face === secondCard.face && firstCard.id != secondCard.id){
        //console.log(matching);
        console.log('matched!');
        firstCard.matched = true;
        secondCard.matched = true;
        appState.matching.matchCount++;
        console.log('matchCount:' + appState.matching.matchCount);
        matching = [];
      }else{
        firstCard.matched = false;
        secondCard.matched = false;
        firstCard.faceUp = false;
        secondCard.faceUp = false;
        matching = [];
      }
    console.log(matching);
  }
  