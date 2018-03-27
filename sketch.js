
var sceneMap = {
  "startScreen": startScreen,
  "inGame" : inGame,
  "menuScreen": menuScreen
  }
  
  var numberOfCards;
  
  var canvasSize = {width : 500, height: 500};
  
  var currentScene = "startScreen";
  
  function setup() {
    createCanvas(canvasSize.width, canvasSize.height);
    currentScene = "startScreen";
  }
  
  function draw() {
    if (sceneMap[currentScene].firstFrame){
      sceneMap[currentScene].setup()
      sceneMap[currentScene].firstFrame = false;
    }
  
    sceneMap[currentScene].draw(); 
    
  
  }
  
  function mousePressed(){
    sceneMap[currentScene].mousePressed();
  }
  
  function keyPressed(){
    sceneMap[currentScene].keyPressed();
  }
  
  