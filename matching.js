var matching = [];

findMatch = function(){
  //the problem is that I am only setting the card in matching array but not in the array that is actually drawn to the board. 
  //use clickToIndex to get the index and change the card in the actuall array.
    var firstCard = matching[matching.length-2].card;
    var secondCard = matching[matching.length-1].card;
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
  