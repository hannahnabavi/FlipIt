var menuItems;
var colorGC;

var appstate = {
  options: {
    difficulty: 16,
    mode: "OneShot",
    theme: "Default"
  }
}


function setup() {
  createCanvas(800, 600, WEBGL);
  menuItems = makeMenuItems();
  selectCurrentSettings(menuItems, appState.options);
  drawMenuTextures(menuItems);
  
  colorGC = createGraphics(width, height, WEBGL);
  // colorGC.show();
  colorGC.style("display", "inline");
  colorGC.background("pink");
  colorGC.camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  // ortho(width / 2, -width / 2, -height / 2,  height / 2, 0, 1450);
}

function draw() {
  background("lightBlue");
  // orbitControl();
  drawMenus(menuItems);
  drawMenusColor(menuItems);
  //TODO: drawMenusRed();
}



function makeMenuItems() {
  var menu = {"difficulties": ["8", "16", "24"],
  "modes": ["FreePlay", "OneShot", "TimeAttack"],
  "themes" : ["Default", "Scary", "Hearthstone"],
  };
  var red = 255;
  var menuObjs = [];
  
  var makeItemObject = function(str) {
    red = red - 5;
    return {
      text: str,
      selected: false,
      col: red
    };
  }


for (var property in menu) {
    if (menu.hasOwnProperty(property)) {
    var objs = menu[property].map(function(str) {
    red = red - 5;
    return {
      text: str,
      selected: false,
      col: red,
      category: property
    }});
    menuObjs = menuObjs.concat(objs);
    console.log(menuObjs);
    }
  }
  
return menuObjs;
}

function selectCurrentSettings(menu, state) {
  var settings = ["difficulty", "mode", "theme"];
  settings.forEach(function(setting) {
    var currentSetting = menu.find(function(menuObj) {
      return menuObj.text == state.options[setting];
    })
    currentSetting.selected = true;
    console.log(currentSetting);
  })
}

function drawMenuTextures(menuItems) {
  var menuTextures = [];
  menuItems.forEach(function(item) {
      var tHeight = height * .05;
      var tWidth = width * .15;
      var gc = createGraphics(tWidth, tHeight);
      gc.background("white");
      gc.push();
      gc.textAlign(CENTER);
      gc.textSize(20);
      gc.text(item.text, tWidth * .5, tHeight * .75);
      gc.pop();
      item.texture = {unselected: gc}
      
      gc = createGraphics(tWidth, tHeight);
      gc.background("lightpink");
      gc.push();
      gc.textAlign(CENTER);
      gc.textSize(20);
      gc.text(item.text, tWidth * .5, tHeight * .75);
      gc.pop();
      item.texture.selected = gc
    })
  }

function drawMenusColor(menuItems) {
  colorGC.push();
  colorGC.translate(140, -80, 150);
  menuItems.forEach(function(item, index){
    var i = floor(index/3);
    var j = index % 3;
    colorGC.push();
    colorGC.translate(0 ,(i * height * .1),  0);
    colorGC.push();
    colorGC.translate(-(j * width * .20),0, 0);
    // colorGC.texture(item.texture.unselected);
    // if(item.selected){
    //   colorGC.texture(item.texture.selected)
    // }
    colorGC.fill([item.col, 0, 0]);
    colorGC.plane(width * .15, height * .05);
    colorGC.pop();
    colorGC.pop();
  })
  colorGC.pop();
}


function drawMenus(menuItems) {
  push();
  translate(140, -80, 150);
  menuItems.forEach(function(item, index){
    var i = floor(index/3);
    var j = index % 3;
    push();
    translate(0 ,(i * height * .1),  0);
    push();
    translate(-(j * width * .20),0, 0);
    texture(item.texture.unselected);
    if(item.selected){
      texture(item.texture.selected)
    }
    plane(width * .15, height * .05);
    pop();
    pop();
  })
  pop();
}

/* This function loads the pixels of the color buffer canvas into an array 
		called pixels and returns them. */
function getPixels() {
    var gl = colorGC.elt.getContext('webgl');
    var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return (pixels);
}
/* This function gets the red channel of the pixel under the mouse as 
		the index for the corresponding object. A more advanced version 
		 could use the 4 bytes (see commented section) */
function getObject(mx, my) {
    if (mx > width || my > height) {
        return 0;
    }

    var gl = colorGC.elt.getContext('webgl');
    var pix = getPixels();

    var index = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);

    var col = pix[index]; // Only returning the red channel as the object index.
    console.log(col);
    var found = undefined;
    var settings = 0;
    
    
    found = menuItems.find(function(element){return element.col === col;})
    return found;
}

function setOthersToDeslect(selectedItem){
  menuItems.forEach(function(menuItem){
    if (menuItem.category === selectedItem.category && (menuItem.text !== selectedItem.text)){
      menuItem.selected = false;
    }
  })
  selectedItem.selected = true;
}
        
startScreen.mousePressed = function (){
    var card = getObject(mouseX, mouseY);
   
    if (card){
      setOthersToDeslect(card);
      console.log(card);
    }
    
    function preGetSelected(items){
      
      for(var a = 0; a < 9; a++){
          if (items.category === "difficulties" && items.selected === true || items.category === "modes" && items.selected === true || items.category === "themes" && items.selected === true){
           return true;
         }
       }
     }
    function getSelected(arr){
        return arr.text
    }
     var preGameState = menuItems.filter(preGetSelected); 
    var gameState = [preGameState[0].text, preGameState[1].text, preGameState[2].text];
    console.log(gameState);
}


// function gameState(items){
  
//     for(var a = 0, b = 0, c = 0; a < 9; a++){
//     if (items[a].category === "difficulties" && items[a].selected === true) {
      
//     }}
//     for(var b = 0; b < 9; b++){
//       if (items[b].category === "modes" && items[b].selected === true) {
        
//     }}
//     for(var c = 0; c < 9; c++){
//       if (items[c].category === "modes" && items[c].selected === true) {
         
//     }
//   }
  
//   return items[a].text;
// }


 
