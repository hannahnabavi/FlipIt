menuScreen = {};
menuScreen.firstFrame =true;

menuScreen.setup = function(){


}

menuScreen.draw = function(){
textSize(40);
text("Select your level", width/5, 100);
menuScreen.drawOption(8,width/2-50,150);
menuScreen.drawOption(16,width/2,150);
menuScreen.drawOption(32,width/2+50,150);
}

menuScreen.drawOption = function(num,x,y){
push()
translate(x,y);
rect(0,0,50,50);
textAlign(CENTER, CENTER);
textSize(30);
text(num,25, 25);
pop();
}

menuScreen.mousePressed =function(){
    if(mouseX > width/2 && mouseX <width/2 +50 && mouseY > 150 && mouseY<200){
numberOfCards =16;
console.log("16");
currentScene= "inGame";
    }
    if(mouseX > width/2-55 && mouseX <width/2 -55+50 && mouseY > 150 && mouseY<200){
        numberOfCards =8;
        currentScene= "inGame";
        console.log("8");
            }
            
            if(mouseX > width/2+55 && mouseX <width/2 +55+ 50 && mouseY > 150 && mouseY<200){
                numberOfCards =32;
                console.log("32");
                currentScene= "inGame";
                    }
}
