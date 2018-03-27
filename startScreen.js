
var startScreen ={};

startScreen.screenText = "Scene: startScreen";
startScreen.dKey =false;
startScreen.firstFrame = true;
startScreen.demoDeck = makeDeck(16);

startScreen.mousePressed = function (){
    
   if(mouseX>148 && mouseX<350 && mouseY> 340 && mouseY<390){
    currentScene = "menuScreen";
   }
    }

startScreen.setup = function(){
    shuffle(startScreen.demoDeck, true);
  
}

startScreen.draw = function (){
    background(245, 238, 248);
    textAlign(CENTER);
    textSize(40);
    strokeWeight(5);
    stroke("black");
    fill(204, 204, 255);
    text("MATCH",width/2,height/5.5); //PUT IN A REALLY COOL FONT
    //text(startScreen.screenText, width/2, height/2); COMMENT OUT FOR THE TIME BEING
    if(startScreen.dKey === true){
        text("Well Done", width/2, height/2+100);
    }
  //  drawDeck(startScreen.demoDeck,4); COMMENT OUT FOR THE TIME BEING. PUT IN INGAME
  startScreen.button();
  //image(bee,100,100,50,50);
 startScreen.border();
 startScreen.buttonSpikeDesign();
}

startScreen.border =function(){
stroke(204, 204, 255);
rect(0,0,width,2);
rect(0,497,width,2);
rect(0,0,3,height);
rect(497,0,5,height);
}

startScreen.buttonSpikeDesign =function(){
  for(var i=150; i<350;i=i+20){
    strokeWeight(1);
    fill("pink");
triangle(i,340,i+20,340,i+10,330);
  triangle(i,393,i+20,393,i+10,403);
  }
strokeWeight(1);
fill("pink");
for(var j=345; j<380;j=j+20){
triangle(353,j,353,j+20,360,j+6);
triangle(148,j,148,j+20,139,j+6);
}
}

startScreen.button =function(){
    fill(255, 235, 238);
    stroke(204, 204, 255);
    strokeWeight(5);
    rect(150,340,200,50,8);
    fill(204, 255, 255);
    stroke("black");
    textSize(20);
    text("S T A R T",250,375);
}


startScreen.keyPressed =function (){
    if(key === "D"){
        startScreen.dKey = true;
    }
    
};