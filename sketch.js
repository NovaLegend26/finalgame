var keysp,keys,keyImg,player1,gameState,cage,cageImg,hammer,hammerImg,stick,stickImg,axe,axeImg,tresure,tresureImg;
var boundary,boundaryV,ability,lives,clang,sword,swordImg,dragon,dragonImg;
var level1,level2,trapped,backgroundImg4;
var axeState,stickState,swordState,obs1State,obs2State,cageState,boundaryVState,boundaryV2,losesound;
var obs1,obs2;
var hammersound,victorysound,dragonsound;
function preload(){

playerImg = loadImage("knight guy.png");
keyImg = loadImage("key bronze.png");
backgroundImg = loadImage("level1.png");
cageImg = loadImage("cage.png");
axeImg = loadImage("axe.png");
stickImg = loadImage("stick.png");
hammerImg = loadImage("hammer.png");
clang = loadSound("clang.mp3");
backgroundImg2 = loadImage("level2.png");
backgroundImg3 = loadImage("trap.png");
backgroundImg4 = loadImage("loser.png");
dragonImg = loadImage("pixel dragon.png");
swordImg = loadImage("Sowoord.png");
treasureImg = loadImage("treasure.png");
hammersound = loadSound("bingo.mp3");
victorysound = loadSound("victory.mp3");
dragonsound = loadSound("dragonbreath.mp3");
losesound = loadSound("fail.mp3");
}

function setup(){

canvas = createCanvas(600,600)
edges = createEdgeSprites();
gameState = "level1";
ability = 0;

lives = 3;

sword=createSprite(60,400,20,20);
sword.addImage(swordImg);
sword.scale = 0.1

keysp = createSprite(550,400,20,20);
keysp.addImage(keyImg);
keysp.scale = 0.5
keys = 0;

boundary = createSprite(300,300,600,10)
boundaryV = createSprite(330,300,10,600)
boundaryV2 = createSprite(340,300,10,600)

dragon=createSprite(430,400,20,20);
dragon.addImage(dragonImg);
dragon.scale = 0.6;

treasure = createSprite(560,400,20,20);
treasure.addImage(treasureImg);
treasure.scale = 0.04

player1 = createSprite(100,500,20,20);
player1.addImage(playerImg);
player1.scale = 0.35

obs1 = createSprite(410,460,80,120);
obs2 = createSprite(540,450,40,100);

player1.velocityX = 0
player1.velocityY = 0

cage = createSprite(550,400,20,20);
cage.addImage(cageImg);
cage.scale = 0.3

hammer = createSprite(280,320,20,20)
hammer.addImage(hammerImg);
hammer.scale =2

stick = createSprite(60,400,20,20)
stick.addImage(stickImg);
stick.scale = 0.1

axe = createSprite(550,520,20,20);
axe.addImage(axeImg);
axe.scale = 0.15

//touched and nottouched

axeState = "nottouched";
stickState = "nottouched";
obs1State = "nottouched";
obs2State = "nottouched";
swordState = "nottouched";
cageState = "nottouched";
boundaryVState = "nottouched";
hammerState = "nottouched";

resetLives = false;
}

function draw() {

  background(255);
  createEdgeSprites();
  console.log(gameState);
  
  player1.collide(boundary)
  player1.collide(edges)
  boundary.visible = false
  boundaryV.visible = false
  boundaryV2.visible = false

  if(lives <= 0){
    losesound.play();
    gameState = "fail";
  }
  
  if (gameState === "level1"){
    background(backgroundImg);
    dragon.visible = false;
    sword.visible = false;
    obs1.visible = false;
    obs2.visible = false;
    treasure.visible = false;
  if(player1.isTouching(hammer)){
    hammer.visible = false;
    ability = 1
  }
  if(ability === 1){
    textSize(20);
    fill("yellow");
    text("Bingo!!",530,20);
    if (hammerState == "nottouched"){
      hammersound.play();
      hammerState = "touched"
    }
  }
  if(player1.isTouching(axe)){
    textSize(20);
    fill("red");
    text("That's not the right tool!",380,40)
    if(axeState == "nottouched"){
      lives --;
      axeState = "touched"
    }
  }
  if(player1.isTouching(stick)){
    textSize(20);
    fill("red");
    text("That's not the right tool!",380,40)
    if(stickState == "nottouched"){
      lives --;
      stickState = "touched"
    }
  }

  if(ability == 1 && player1.isTouching(cage)){
    if(cageState == "nottouched"){
      cage.visible = false;
      clang.play();
      cageState = "touched"
    }
  } else{
    player1.collide(cage);
  }

  fill("light_blue")
      textSize(20)
      text("Fine the correct tool,",10,20)
      text("to break the cage and proceed to ",10,40)
      text("the next level ",10,60)

     if(player1.isTouching(keysp)){
       keys = 1;
     }
     if(keys == 1){
       player1.x=100;
       player1.y = 500;
       gameState = "level2"
       dragon.visible = true;
       treasure.visible = true;
       sword.visible = true;
     }
  }
  if (gameState === "level2"){
    background(backgroundImg2);
    hammer.visible = false;
    stick.visible = false;
    axe.visible = false;
    cage.visible = false;
    keysp.visible = false;
    obs1.visible = false;
    obs2.visible = false;
    if(player1.isTouching(sword)){
      gameState = "trapped";
    }
    player1.collide(boundaryV2);
    
    if(player1.isTouching(boundaryV)&&swordState === "nottouched"){
      textSize(20);
      fill("green");
      text("You can't get past the dragon without the sword!",170,70)
      if(boundaryVState == "nottouched"){
        lives --;
        dragonsound.play();
        boundaryVState = "touched"
      }
    }
    
    if(player1.isTouching(boundaryV)&&swordState === "touched"){
      if(boundaryVState == "touched"||boundaryVState== "nottouched"){
        victorysound.play();
        gameState = "end"
      }
    }
  }

  if(gameState == "end"){
    background(backgroundImg2);
    hammer.visible = false;
    stick.visible = false;
    axe.visible = false;
    cage.visible = false;
    keysp.visible = false;
    obs1.visible = false;
    obs2.visible = false;
    dragon.visible = false;
    sword.visible = false;
    treasure.visible = true;
    textSize(40);
    fill("cyan");
    text("GAME OVER!",175,300);
    textSize(30);
    text("You won!!",240,340);
  }
  if(gameState == "fail"){
    background(backgroundImg4);
    losesound.stop();
    hammer.visible = false;
    stick.visible = false;
    axe.visible = false;
    cage.visible = false;
    keysp.visible = false;
    obs1.visible = false;
    obs2.visible = false;
    dragon.visible = false;
    sword.visible = false;
    treasure.visible = false;
    textSize(40);
    fill("orange");
    text("GAME OVER!",175,300);
    textSize(30);
    text("You lost!",240,340);
  }

  if(gameState ==="trapped"){
    
    background(backgroundImg3);
    textSize(20);
    fill(255,0,0)
    text("Oops, looks like you trigerred",10,20)
    text("a trap. Find a secure way to",10,40)
    text("get to the sword, without touching",10,60)
    text("the sharp crystals, but some of them might be weak",10,80)
    text("and won't hurt you",10,100)
    //player1.x = 100
    //player1.y = 500
    sword.x = 540;
    sword.y = 330;
    dragon.visible = false
    obs1.visible = false;
    obs2.visible = false;
    treasure.visible = false;
    if(player1.isTouching(obs1)){
      textSize(20);
      fill("yellow");
      text("Oops you touched a sharp crystal!",10,130)
      if(obs1State == "nottouched"){
        lives --;
        obs1State = "touched"
      }
    }
    if(player1.isTouching(obs2)){
      textSize(20);
      fill("yellow");
      text("Oops you touched a sharp crystal!",10,130)
      if(obs2State == "nottouched"){
        lives --;
        obs2State = "touched"
      }
      
    }
    if(player1.isTouching(sword)&&swordState=="nottouched"){
      player1.x = 100
      player1.y = 500
      swordState = "touched";
      sword.visible = false;
    }
    if(swordState == "touched"){
      background(backgroundImg2);
      dragon.visible = true;
      treasure.visible = true;
      gameState = "level2"
    }
  }
  textSize(20)
  fill("black");
  text("Lives: "+lives,310,40);

    drawSprites();

    if (keyDown("UP_ARROW")) {
      player1.velocityY = -3; 
    } 
    if (keyWentUp("UP_ARROW")) {
      player1.velocityY = 0;
    }
    if (keyDown("DOWN_ARROW")) {
      player1.velocityY = 3;
    }
    if (keyWentUp("DOWN_ARROW")) {
      player1.velocityY = 0;
    }
    if (keyDown("RIGHT_ARROW")) {
      player1.velocityX = 3;
    }
    if (keyWentUp("RIGHT_ARROW")) {
      player1.velocityX = 0;
    }
    if (keyDown("LEFT_ARROW")) {
      player1.velocityX = -3;
    }
    if (keyWentUp("LEFT_ARROW")) {
      player1.velocityX = 0;
    }
}
  
 
