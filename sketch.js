var fuelCollected = 0 ;
var rocket,rocketImage;
var fuel,planets,astroid;
var bg, world, gameOver;
var gameState = "start";
var refuellingSound = new Audio('sounds/refuel.m4a');
var gameOver = new Audio('sounds/game_over.mp3');
var planet1,planet2,planet3;
var fuelImage,rocket1Image,rocket2Image;
var astroid1,astroid2,astroid3,astroid4,astroid5;

function preload(){
    bg = loadImage("images/bg1.jpeg");
    fuelImage = loadImage("images/Fuel.png");
    planet1 = loadImage("images/Planet2.png");
    planet2 = loadImage("images/Planet1.png");
    planet3 = loadImage("images/Planet3.png");
    astroid1 = loadImage("images/Astroid1.png");
    astroid2 = loadImage("images/Astroid2.png");
    astroid3 = loadImage("images/Astroid3.png");
    astroid4 = loadImage("images/Astroid4.png");
    astroid5 = loadImage("images/Astroid5.png");
    rocket1Image = loadImage("images/Rocket1.png");
    rocket2Image = loadImage("images/Rocket2.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight-143);

  rocket = createSprite(800,500,120,120);
  rocket.setCollider("rectangle",0,-70,200,400);
  rocket.scale = 0.4;
  
  fuelGroup = createGroup();
  astroidGroup = createGroup();
  planetGroup = createGroup();

}

function draw(){
  camera.position.x = displayWidth/2;
  camera.position.y = rocket.y;
  
  image(bg,0,-displayHeight*2,displayWidth,displayHeight*2);
  image(bg,0,-displayHeight*3,displayWidth,displayHeight*2);

  if(gameState === "game"){
        background(bg);
        image(bg,0,-displayHeight,displayWidth,displayHeight*2);
        fuels();
        astroids();
        planets();

        rocket.addImage(rocket1Image);
          if(keyIsDown(UP_ARROW)){
            rocket.y = rocket.y-6;
            rocket.addImage(rocket2Image);
          }

          if(keyIsDown(LEFT_ARROW)){
            rocket.x = rocket.x-6;
            rocket.addImage(rocket2Image);
          }

          if(keyIsDown(RIGHT_ARROW)){
            rocket.x = rocket.x+6;
            rocket.addImage(rocket2Image);
          }
        
          if(rocket.isTouching(fuelGroup)){
            fuelCollected = fuelCollected+1;
            fuelGroup.destroyEach();
            refuellingSound.play();
            }

          if(rocket.isTouching(astroidGroup)){
            gameState = "end";
            gameOver.play();
          }

          if(rocket.isTouching(planetGroup)){
            gameState = "end";
            gameOver.play();
          }
    }

  keyPressed();
  drawSprites();

  push();0
  fill(255,255,255);
  textSize(30);
  textFont("Lucida Console")
  text("FUEL COLLECTED : "+fuelCollected,100,camera.position.y-300);
  pop();

  if(gameState === "start"){
        background("mediumspringgreen");
        strokeWeight(4);
        stroke("yellow")
        fill(255,0,0)
        textSize(60);
        textFont("MV Boli");
        text("Use Arrow Keys to Play",430,320);
        text("_________________________",420,325);
        text("Collect Fuel as much as you can",335,450);
        text("_______________________________",320,455);   
        text("=>Press Space to Start The Game*",260,580);
  }

  if(gameState === "end"){
        fuelGroup.destroyEach();
        astroidGroup.destroyEach();
        planetGroup.destroyEach();
        rocket.x = 800;
        fuelCollected = 0;
        background(00);
        fill(225,0,0);
        textSize(200);
        textFont("Segoe Script");
        text("GAME",420,camera.position.y-100);
        text("OVER",420,camera.position.y+100);
        fill(0,255,0);
        textSize(50);
        textFont("MV Boli");
        text("*Press Space To Restart The Game",360,camera.position.y+220);
   }

  
}

function fuels(){
      fuel = createSprite(-600,-300,50,50);
      fuel.scale = 0.5;
      //fuel.debug = "true";
      if(frameCount%200===0){
          fuel.x = random(100,1500);
          fuel.y = camera.position.y-500;
          fuel.addImage(fuelImage);
          fuel.lifetime=500;
          fuelGroup.add(fuel);
          if(fuel.y>camera.position.y+500){
            fuel.destroy();
          }
      }
}

function astroids(){
      astroid = createSprite(-500,-100,80,80);
      astroid.scale = 0.4;
      //astroid.debug = "true";
      astroid.setCollider("circle")
      if(frameCount%80===0){
        astroid.x = random(100,1500);
        astroid.y = camera.position.y-500;
        var rand = Math.round(random(1,5));
            switch(rand){
                case 1: astroid.addImage("astroid1", astroid1);
                break;
                case 2: astroid.addImage("astroid1", astroid2);
                break;
                case 3: astroid.addImage("astroid1", astroid3);
                break;
                case 4: astroid.addImage("astroid1", astroid4);
                break;
                case 5: astroid.addImage("astroid1", astroid5);
                break;
              }
       astroid.lifetime=200;
       astroidGroup.add(astroid);
       if(astroid.y>camera.position.y+500){
           astroid.destroy();
        }
      }    
}

function planets(){
      planet = createSprite(-400,-100,100,100);
      planet.scale = 0.4;
      //planet.debug = "true";
      planet.setCollider("circle");
      if(frameCount%150===0){
        planet.x = random(200,1400);
        planet.y = camera.position.y-500;  
        var rand1 = Math.round(random(1,3));
              switch(rand1){
                case 1: planet.addImage("planet1", planet1);
                break;
                case 2: planet.addImage("planet1", planet2);
                break;
                case 3: planet.addImage("planet1", planet3);
                break;
              }
      planet.lifetime=300;
      planetGroup.add(planet);
      if(planet.y>camera.position.y+500){
          planet.destroy();
        }
      }
}

function keyPressed(){
      if(keyCode === 32){
        gameState = "game";
      }
}