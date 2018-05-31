//next step: get the L to flip
//and get mousePressed button to work
//and get the cards to flip in the background (i was thinking translucent cards)
var startScreen = {};
startScreen.firstFrame =true;
var myFont;
var mySong;



startScreen.setup=function(){
  //  mySong.setVolume(2);
   mySong.play();
   
   
    title={
        w:593,
        h: 100
    }

    play={
        w:170,
        h:60
    }

    leftB={
        w:20,
        h:800
    }

    rightB={
        w:25,
        h:800
    }

    bottomB={
        w:600,
        h:30
    }

    topB={
        w:600,
        h:30
    }

    topLeftC={
        w:20,
        h:20
    }

    bottomLeftC={
        w:20,
        h:20
    }

    topRightC={
        w:30,
        h:30
    }

    bottomRightC={
        w:30,
        h:30
    }

 f= createGraphics(75,100);
 f.background(159, 168, 218 );
 //loadF();

h= createGraphics(title.w,title.h); //create graphics for title
loadTitle();

j=createGraphics(play.w,play.h); //create graphics for play button
loadPlayButton();

k=createGraphics(leftB.w,leftB.h);//create graphics for left border
loadLeftBorder();


r=createGraphics(rightB.w,rightB.h);//create graphics for right border
loadRightBorder();


p=createGraphics(bottomB.w,bottomB.h);//create graphics for bottom border
loadBottomBorder();


d=createGraphics(topB.w,topB.h);//create graphics for top border
loadTopBorder();

w=createGraphics(topLeftC.w,topLeftC.h);
loadTopLeftCube();


q=createGraphics(bottomLeftC.w,bottomLeftC.h);
loadBottomLeftCube();


e=createGraphics(topRightC.w,topRightC.h);
loadTopRightCube();

v=createGraphics(bottomRightC.w,bottomRightC.h);
loadBottomRightCube();


 planeOne={
     w:75,
     h:100,
     x:-500,
     y:-500,
     rot:PI,
     angle:0
 }

planeTwo={
    w:75,
    h:100,
    x:580,
    y:13,
    rot:PI,
    angle:0
}

planeThree={
    w:75,
    h:100,
    x:-500,
    y:400,
    rot:0,
    angle:0
}

planeFour={
    w:80,
    h:95,
    x:0,
    y:-300,
    rot:0,
    angle:0
}




 tweenFunction();

}

 function tweenFunction(){
 createjs.Tween.get(planeOne).to({x:0,y:500}, 5000,createjs.Ease.linear).call(
         function(){
             createjs.Tween.get(planeOne).to({x:400, y:50}, 5000, createjs.Ease.linear).call(
                function(){
                    createjs.Tween.get(planeOne).to({x:400, y:-100}, 5000, createjs.Ease.linear).call(
                        function(){
                            createjs.Tween.get(planeOne).to({x:-500, y:-420}, 5000, createjs.Ease.linear).call(
                                function(){
                                    createjs.Tween.get(planeOne).to({x:500, y:-500}, 5000, createjs.Ease.linear).call(
                                        function(){
                                            createjs.Tween.get(planeOne).to({x:-200, y:600}, 5000, createjs.Ease.linear).call(
                                                function(){
                                                    createjs.Tween.get(planeOne).to({x:500, y:-400}, 5000, createjs.Ease.linear).call(
                                                        function(){
                                                            createjs.Tween.get(planeOne).to({x:-400,y:40}, 2600,createjs.Ease.linear).call(
                                                                function(){
                                                                    createjs.Tween.get(planeOne).to({x:400,y:400}, 2600,createjs.Ease.linear).call(
                                                                        function(){
                                                                            createjs.Tween.get(planeOne).to({x:-400,y:30}, 2600,createjs.Ease.linear).call(
                                                                                function(){
                                                                                    createjs.Tween.get(planeOne).to({x:400,y:400}, 2600,createjs.Ease.linear).call(
                                                                                        function(){
                                                                                            createjs.Tween.get(planeOne).to({x:-400,y:200}, 2600,createjs.Ease.linear);
                                                                                        }
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                 }
                             )
                         }
                    )
                  
                }
             )
            
         }
     )
  createjs.Tween.get(planeTwo).to({x:-380,y:-350}, 3200,createjs.Ease.linear).wait(1).call(
     function(){
                 createjs.Tween.get(planeTwo).to({x:0,y:500}, 8000,createjs.Ease.linear).call(
                     function(){
                         createjs.Tween.get(planeTwo).to({x:500,y:-500}, 8000,createjs.Ease.linear).call(
                             function(){
                                 createjs.Tween.get(planeTwo).to({x:-500,y:500}, 8000,createjs.Ease.linear).call(
                                     function(){
                                        createjs.Tween.get(planeTwo).to({x:300,y:300}, 8000,createjs.Ease.linear).call(
                                            function(){
                                                createjs.Tween.get(planeTwo).to({x:-50,y:-70}, 8000,createjs.Ease.linear).call(
                                                    function(){
                                                        createjs.Tween.get(planeTwo).to({x:500,y:400}, 8000,createjs.Ease.linear).call(
                                                            function(){
                                                                createjs.Tween.get(planeTwo).to({x:400,y:0}, 8000,createjs.Ease.linear).call(
                                                                    function(){
                                                                        createjs.Tween.get(planeTwo).to({x:-400,y:300}, 8000,createjs.Ease.linear);
                                                                    }
                                                                )
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                     }
                                 )
                             
                        
                    }
               )
            }
         )
     });
  createjs.Tween.get(planeThree).to({x:340,y:-100}, 5000,createjs.Ease.linear).wait(1).call(
  function(){
  createjs.Tween.get(planeThree).to({x:-300,y:-300}, 5000,createjs.Ease.linear).call(
      function(){
        createjs.Tween.get(planeThree).to({x:400,y:0}, 5000,createjs.Ease.linear).call(
            function(){
                createjs.Tween.get(planeThree).to({x:-400,y:-400}, 5000,createjs.Ease.linear).call(
                    function(){
                        createjs.Tween.get(planeThree).to({x:400,y:400}, 5000,createjs.Ease.linear).call(
                            function(){
                                createjs.Tween.get(planeThree).to({x:-400,y:300}, 5000,createjs.Ease.linear).call(
                                    function(){
                                        createjs.Tween.get(planeThree).to({x:400,y:10}, 5000,createjs.Ease.linear).call(
                                            function(){
                                                createjs.Tween.get(planeThree).to({x:-400,y:190}, 5000,createjs.Ease.linear)
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
            
        )
      }
  )
  });

  createjs.Tween.get(planeFour).to({x:100,y:500}, 5000,createjs.Ease.linear).call(
function(){
  createjs.Tween.get(planeFour).to({x:-500,y:300}, 5000,createjs.Ease.linear).call(
    function(){
      createjs.Tween.get(planeFour).to({x:-500,y:0}, 5000,createjs.Ease.linear).call(
          function(){
              createjs.Tween.get(planeFour).to({x:400,y:-400}, 5000,createjs.Ease.linear).call(
                  function(){
                      createjs.Tween.get(planeFour).to({x:-400,y:400}, 5000,createjs.Ease.linear).call(
                          function(){
                              createjs.Tween.get(planeFour).to({x:400,y:300}, 5000,createjs.Ease.linear).call(
                                  function(){
                                      createjs.Tween.get(planeFour).to({x:-400,y:10}, 5000,createjs.Ease.linear).call(
                                          function(){
                                              createjs.Tween.get(planeFour).to({x:400,y:190}, 5000,createjs.Ease.linear)
                                          }
                                      )
                                  }
                              )
                          }
                      )
                  }
              )
          }
          
      )
    }
)
 })
}



 function loadF(){
 f.background("black");
 }


function loadTitle(){ //the title screen
    h.push();
    h.background(250, 243, 253);
     h.textAlign(CENTER);
     h.textFont(myFont);
    h.fill("black");
     h.stroke(250, 243, 253 );
     h.strokeWeight(15);
   h.textSize(147);
   h.text("flipit", ((h.width/2+(10))), 92);
   console.log("hi");
   h.pop();
}

function loadPlayButton(){ //play button
    j.push();
    j.textAlign(CENTER);
    j.textFont(myFont);
    j.background(250, 243, 253);
  j.textSize(60);
  j.stroke("black");
  j.fill(232, 218, 239);
  j.strokeWeight(20);
  j.text("play", play.w/2 , 45); 
  j.pop();
}

function loadLeftBorder(){ //left border
k.push();
k.background(250, 243, 253);
k.noStroke();
k.fill(209, 242, 235); //torquise
k.rect(0,0,5,800);
k.fill( 102, 102, 204); //dark blue
k.rect(5,5,5,790);
k.fill(159, 168, 218 ); //purple
k.rect(10,10,5,780);
k.fill("black"); //black
k.rect(15,15,5,770);
k.pop();
}

function loadRightBorder(){ //right border
    r.push();
    r.background(250, 243, 253);
    r.noStroke();
    r.fill("black");
    r.rect(20,0,5,800);
    r.fill(209, 242, 235);//torquise
    r.rect(15,5,5,790);
    r.fill( 102, 102, 204); //dark blue
    r.rect(10,10,5,780);
    r.fill(159, 168, 218 ); //purple
    r.rect(5,15,5,775);
    r.fill("black"); //black
    r.rect(0,20,5,765);
    r.pop();
}

function loadBottomBorder(){ //bottom border
    p.push();
    p.background(250, 243, 253);
    p.noStroke();
    p.fill("black");
    p.rect(0,20,600,5);
    p.fill(209, 242, 235);//torquise
    p.rect(0,15,590,5);
    p.fill( 102, 102, 204); //dark blue
    p.rect(5,10,580,5);
    p.fill(159, 168, 218 ); //purple
    p.rect(10,5,570,5);
    p.fill("black");
    p.rect(15,0,563,5);
    p.pop();
}

function loadTopBorder(){ //top border
    d.push();
    d.background(250, 243, 253);
    d.noStroke();
    d.fill("black");
    d.rect(-5,0,600,5); 
    d.fill(209, 242, 235);//torquise
    d.rect(0,5,590,5);
    d.fill( 102, 102, 204); //dark blue
    d.rect(5,10,580,5);
    d.fill(159, 168, 218 ); //purple
    d.rect(10,15,570,5);
    d.fill("black");
    d.rect(15,20,560,5);
    d.pop();
}

function loadTopLeftCube(){
    w.push();
    w.background("black");
    w.noStroke();
    w.fill(209, 242, 235); //torquise
    w.rect(0,0,5,20);
    w.fill(102, 102, 204); //dark blue
    w.rect(5,0,5,20);
    w.rect(5,0,15,5);
    w.fill(159, 168, 218); //purple
    w.rect(10,5,5,20);
    w.rect(10,5,10,5);
    w.fill("black");
    w.rect(15,10,10,5);
    w.pop();
}

function loadBottomLeftCube(){
q.push();
q.background("black");
q.noStroke();
q.fill(209, 242, 235); //torquise
q.rect(0,0,5,20);
q.fill(102, 102, 204); //dark blue
q.rect(5,0,5,20);
q.rect(5,15,15,5);
q.fill(159, 168, 218); //purple
q.rect(10,0,5,15);
q.rect(10,10,15,5);
q.pop();
}

function loadTopRightCube(){
    e.push();
    e.background(250, 243, 253);
    e.noStroke();
    e.fill("black");
    e.rect(0,20,6,10);
    e.fill(159, 168, 218); //purple
    e.rect(6,15,5,20);
    e.rect(0,15,10,5);
    e.fill(102, 102, 204); //dark blue
    e.rect(11,15,5,20);
    e.rect(0,10,16,5);
    e.fill(209, 242, 235); //torquise
    e.rect(16,10,5,20);
    e.rect(0,5,21,5);
   e.fill("black"); //black
   e.rect(21,0,5,30);
   e.rect(0,0,25,5);
    e.pop();
}


function loadBottomRightCube(){
v.push();
v.background(250, 243, 253);
v.noStroke();
v.fill(159, 168, 218); //purple
v.rect(0,0,12,10);
v.fill(102, 102, 204); //dark blue
v.rect(5,0,5,15);
v.rect(0,10,10,5);
v.fill(209, 242, 235); //torquise
v.rect(10,0,5,15);
v.rect(0,15,15,5);
v.fill("black");
v.rect(15,0,5,20);
v.rect(0,20,20,5);
v.pop();
}

startScreen.draw =function(){
    background(250, 243, 253  );

   

    push(); //for first plane
    texture(f);
    planeOne.angle=planeOne.angle+.07;
    translate(planeOne.x,planeOne.y);
    rotateZ(planeOne.angle);
    plane(planeOne.w,planeOne.h);
    
    pop();

    push();  //for second plane

    planeTwo.angle=planeTwo.angle+.07;
    translate(planeTwo.x, planeTwo.y);
    rotateZ(planeTwo.angle);
    plane(planeTwo.w,planeTwo.h);
    pop();


    push();  //for third plane
    planeThree.angle=planeThree.angle+.07;
    translate(planeThree.x, planeThree.y);
    rotateZ(planeThree.angle);
    plane(planeThree.w,planeThree.h);
    pop();

    

     push();  //for Fourth plane
     planeFour.angle=planeFour.angle+.07;
     translate(planeFour.x, planeFour.y);
    rotateZ(planeFour.angle);
     plane(planeFour.w,planeFour.h);
     pop();

    push(); //the title
    translate(-10,-170);
    texture(h);
    plane(title.w, title.h);
    pop();

    push(); //the play button
    translate(0,140);
    texture(j);
    plane(play.w, play.h);
    pop();

    push(); //left border
    translate(-290,0);
    texture(k);
    plane(leftB.w,leftB.h);
    pop();

    push(); //right border
    translate(285,0);
    texture(r);
    plane(rightB.w,rightB.h);
    pop();

    push(); //bottom border
    translate(0,390);
    texture(p);
    plane(bottomB.w,bottomB.h);
    pop();

    push(); //top border
    translate(0,-385);
    texture(d);
    plane(topB.w,topB.h);
    pop();

    push(); //top left cube
    translate(-290,-380);
    texture(w);
    plane(topLeftC.w,topLeftC.h);
    pop();


    push(); //bottom left cube
    translate(-290,380);
    texture(q);
    plane(bottomLeftC.w,bottomLeftC.h);
    pop();

    push(); //top right cube
    translate(287,-385);
    texture(e);
    plane(topRightC.w,topRightC.h);
    pop();

    push(); //bottom right cube
    translate(292,390);
    texture(v);
    plane(bottomRightC.w,bottomRightC.h);
    pop();
    

}

startScreen.mousePressed=function(){
    if(mouseX>216 && mouseX<381 && mouseY>514 && mouseY<566){
appState.currentScene="menuScreen";
    }
  

}