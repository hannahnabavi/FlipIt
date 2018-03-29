var sceneMap = {
}

var mode = "dev"

var appState = {
  options : {},
  gameState : {}
};

var canvasSize = {width : 500, height: 500};

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  appState.currentScene = "startScreen";
  if (mode === "dev"){
    devState(appState);
  }
}

function draw() {
 if(sceneMap[appState.currentScene].firstFrame){
   sceneMap[appState.currentScene].setup(appState);
   sceneMap[appState.currentScene].firstFrame = false;
 }
 
 
  sceneMap[appState.currentScene].draw(appState);
}

function mousePressed(){
  sceneMap[appState.currentScene].mousePressed(appState);
}







