var findMatch = function(matchMaking){
  if(appState.gameState.matchMaking.matching.length >= 2){
    var firstCard = matchMaking.matching[matchMaking.matching.length-2];
    var secondCard = matchMaking.matching[matchMaking.matching.length-1];
    //var firstIndex = matchMaking.matching[matchMaking.matching.length-2].index;
    //var secondIndex = matchMaking.matching[matchMaking.matching.length-1].index;
    var firstId = firstCard.id;
    var secondId = secondCard.id;
    console.log(firstCard);
    console.log(secondCard);
    console.log(firstId);
    console.log(secondId);
    //console.log(firstIndex);
    //console.log(secondIndex);
    if(firstCard.face === secondCard.face && firstCard.id != secondCard.id && firstCard.matched === false && secondCard.matched === false){
      console.log('matched!');
      firstCard.matched = true;
      secondCard.matched = true;
      matchMaking.matchCount++;
      console.log('matchCount:' + matchMaking.matchCount);
      matchMaking.totalTrial++;
      matchMaking.matching = [];
    }else{
      if(firstCard.matched === false && secondCard.matched === false){
        //appState.gameState.deck[firstIndex].matched = false;
        //appState.gameState.deck[secondIndex].matched = false;
        setTimeout(function(){
          flipCard(firstId);
          flipCard(secondId);
        },900);
      
      console.log('flipped back');
      matchMaking.totalTrial++;
      matchMaking.matching = [];
      }  
    }
  }
  if(appState.gameState.matchMaking.matchCount === 8){
    if(appState.currentScene === 'scoreModee'){
      appState.gameState.score.scores.push(Math.round(scoreCalc()));
      console.log('score Added!');
      //console.log('tries:'+' '+matchMaking.totalTrial+'  '+'time:'+appState.gameState.score.timerValue);
    }
    setTimeout(function(){appState.currentScene = 'finishScreen'},1000);
  }
}


flipCard = function(id){
  for(var i = 0; i<appState.gameState.deck.length; i++){
    if(id === appState.gameState.deck[i].id){
      appState.gameState.deck[i].matched = false;
      createjs.Tween.get(appState.gameState.deck[i]).to({rot: 0, faceUp: false}, 300);
    }
  }
}