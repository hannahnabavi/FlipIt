var timerScreen = {};

timerScreen.firstFrame = true;
timerScreen.screenText = 'this is timer';

var timeToCount = 15;
var firstText = true;
var firstClick = true;

timerScreen.setup = function(){
    
}

timerScreen.draw = function(){
    sortScoreBoard();
    push();
    background('lightblue');
    textAlign(CENTER);
    textSize(40);
    text(timerScreen.screenText,width/2,50);
    if(firstText){
        textSize(35);
        text('click anywhere to start',width/2,height/2+100);
    }
    pop();
    
    push();
    textAlign(CENTER);
    textSize(60);
    text(timeToCount,width/2, height/2);
    pop();
}

timerScreen.mousePressed = function(){
    firstText = false;
    if(firstClick === true){
        startTimer();
    }
    firstClick = false;
}

timerScreen.keyPressed = function(){
}

function startTimer(){
    if(timeToCount > 0){
        setInterval(function(){
            if(timeToCount > 0){
                timeToCount--;                                                                                                                                                                                                                                                              
            }
        },1000);
    }
}

function startInGameTimer(){
    inGameInterval = setInterval(function(){
         if(appState.currentScene === 'scoreModee'){
            appState.gameState.score.timerValue++;
         }
    },100)
}