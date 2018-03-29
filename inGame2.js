var inGame2 = {};

inGame2.firstFrame = true;
inGame2.screenText = 'choose your second card';

inGame2.setup = function(){
    console.log('choose 2nd card');
}

inGame2.draw = function(){
    push();
    background('pink');
    textAlign(CENTER);
    textSize(40);
    text(inGame2.screenText, width/2, 50);
    pop();
}

inGame2.mousePressed = function(){
    appState.currentScene = 'inGame';
}

inGame2.keyPressed = function(){

}

