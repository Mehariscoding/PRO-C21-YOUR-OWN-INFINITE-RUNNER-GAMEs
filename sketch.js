var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex;
var ground, invisibleGround, groundImage;

var obstacle1Group; // Use a group to manage multiple obstacles
var towerImg, tower1, tower2;
var score;
var gameOverImg, restartImg;
var gameOver, restart;
var trexImage

function preload() {
  towerImg = loadImage("tower.png");
  trexImage= loadImage("trex.png")
  groundImage = loadImage("ground.png");
  obstacle1 = loadImage("obstacle1.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);

  tower1 = createSprite(300, 100);
  tower1.addImage("tower", towerImg);
  tower2 = createSprite(900, 100);
  tower2.addImage("tower", towerImg);

  trex = createSprite(50, 160, 20, 50);
  trex.addImage("trex",trexImage)
  trex.scale=0.4
obstacle1.scale=0.5
  ground = createSprite(180, 200, 400, 40);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
 ground.scale= 1
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

 
  score = 0;

  obstacle1Group = new Group(); // Use a group for multiple obstacles
}

function draw() {
  background(180);

  text("Score: " + score, 500, 50);
  trex.depth = trex.depth + 1;
  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;

    tower1.velocityX = -1;
    tower2.velocityX = -1;

    if (tower1.x <= -300) {
      tower1.x = 900;
    }
    if (tower2.x <= -300) {
      tower2.x = 900;
    }

    ground.velocityX = -(4 + (3 * score) / 100);

    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.5;

    ground.velocityX = -(4 + (3 * score) / 100);

    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnObstacle1();

    // Check for collisions between trex and obstacles
    if (trex.isTouching(obstacle1Group)) {
      gameState = END;
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }

    tower1.velocityX = 0;
    tower2.velocityX = 0;
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    // Set lifetime of the obstacles to -1 to prevent them from disappearing
    obstacle1Group.setLifetimeEach(-1);
    // Stop the obstacles from moving
    obstacle1Group.setVelocityXEach(0);
  }

  trex.collide(invisibleGround);

  drawSprites();
}

function reset() {
  gameState = PLAY;
  score = 0;
  trex.y = 160;
  obstacle1Group.destroyEach(); // Clear the obstacle group
}

function spawnObstacle1() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    obstacle.addImage(obstacle1);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstacle1Group.add(obstacle); // Add obstacle to the group
  }
} 