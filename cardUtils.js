var cyl = {};
var spin = 0;
 
function setup(){
  createCanvas(710, 400, WEBGL);
  cyl.x = 100;
  cyl.y = 100;
  
  createjs.Tween.get(cyl)
  .to({x:300}, 400)
  .wait(500).to({y:500}, 100)
}

function draw(){
  background(250);
  translate(0, 0, 0);
 push();
 rotateY(frameCount * spin);
  box(100, 150, 10);
 pop();
  if(frameCount*0.0025 >= QUARTER_PI){
    spin=0;
    console.log('spin stopped')
    
  }

}

function mousePressed(){
  loop(0);
  if(mouseX>305 && mouseX<403 && mouseY<276 && mouseY>123){
    spin += .01;
    rotateY(frameCount * 4);
     console.log("Test");
   
    
  }
}
