var sceneMap = {
  "inGame" : inGame,
  "inGame2": inGame2,
  "finishScreen": finishScreen,
  "threedcard" : threedcard
}

var mode = "dev"
var matchCount = 0;

var appState = {
  options : {},
  gameState : {},
  matching: {matchCount}
};

var canvasSize = {width : 500, height: 500};

function preload(){
    var scenes = Object.getOwnPropertyNames(sceneMap);
    scenes.forEach(function (scene){
        if (Object.getOwnPropertyNames(sceneMap[scene]).find(function(prop) {return prop == "preload" && (typeof scene[prop]) == "function"})){
            sceneMap[scene].preload();
        }
    })
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height, WEBGL);
  pixelDensity(1);
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







