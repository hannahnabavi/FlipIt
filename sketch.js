var sceneMap = {
  "inGame" : inGame,
  "inGame2": inGame2,
  "finishScreen": finishScreen,
  "newthreedcard" : newthreedcard,
  "startScreen" : startScreen,
};

var themeMap = {
    "debugTheme" : debugTheme
};

var mode = undefined;
var matchCount = 0;

var appState = {
  fonts : {},
    options : {
        dificulty: 16,
        mode: "FreePlay",
        theme: "Default"
    },
  gameState : {} 
};

var canvasSize = {width : 600, height: 800};

function preload(){
  mySong=loadSound("music.mp3");
  myFont=loadFont("curvedSquare.ttf");
    var scenes = Object.getOwnPropertyNames(sceneMap);
    console.log(scenes);
    scenes.forEach(function (scene){
        if (Object.getOwnPropertyNames(sceneMap[scene]).find(function(prop) {return prop == "preload" && (typeof sceneMap[scene][prop]) == "function"})){
            console.log("preloading " + scene);
            sceneMap[scene].preload();
        }
    })

    var themes = Object.getOwnPropertyNames(themeMap);
    themes.forEach(function (theme){
        if (Object.getOwnPropertyNames(themeMap[theme]).find(function(prop) {return prop == "preload" && (typeof themeMap[theme][prop]) == "function"})){
            themeMap[theme].preload();
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







