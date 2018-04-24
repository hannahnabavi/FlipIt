var matching = [];

var toatlTrial = 0;

var findMatch = function(){
  if(matching.length >= 2){
    var firstCard = matching[matching.length-2].card;
    var secondCard = matching[matching.length-1].card;
    var firstIndex = matching[matching.length-2].index;
    var secondIndex = matching[matching.length-1].index;
    if(firstCard.face === secondCard.face && firstCard.id != secondCard.id && firstCard.matched === false && secondCard.matched === false){
      //console.log(matching);
      console.log('matched!');
      firstCard.matched = true;
      secondCard.matched = true;
      appState.matching.matchCount++;
      console.log('matchCount:' + appState.matching.matchCount);
      toatlTrial++;
      matching = [];
    }else{
      //the problem here is I need to only flipback the cards if they are not matched.
      if(firstCard.matched === false && secondCard.matched === false){
        appState.gameState.deck[firstIndex].matched = false;
      appState.gameState.deck[secondIndex].matched = false;
      setTimeout(function(){appState.gameState.deck[firstIndex].faceUp = false;
        appState.gameState.deck[secondIndex].faceUp = false;},500);
      console.log(firstIndex);
      console.log(secondIndex);
      console.log('flipped back');
      toatlTrial++;
      matching = [];
      }  
    }
  }
  if(appState.matching.matchCount === 8){
    setTimeout(function(){appState.currentScene = 'finishScreen'},1000);
  }
}