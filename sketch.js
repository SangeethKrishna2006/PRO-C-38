const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var body, world, engine;
var ball, ground, ballImg;
var score;
var GAMEWON = 2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preLoad() {
    ballImg = loadImage("redball.png");
}


function setup() {
    createCanvas(900, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    score = 0;

    ball = createSprite(200, 300, 50, 50);
    ball.shapeColor = "red";


    //different grounds
    ground = createSprite(450, 390, 1000, 20);
    ground.shapeColor = "green";

    ground2 = createSprite(1000, 300, 200, 20);
    ground2.shapeColor = "green";


    ground3 = createSprite(1500, 200, 250, 20);
    ground3.shapeColor = "green";


    ground4 = createSprite(2100, 390, 800, 20);
    ground4.shapeColor = "green";

    ground5 = createSprite(3100, 390, 1000, 20);
    ground5.shapeColor = "green"

    ground6 = createSprite(4000, 300, 1000, 20);
    ground6.shapeColor = "green"

    ground7 = createSprite(4600, 340, 150, 20);
    ground7.shapeColor = "green"

    ground8 = createSprite(5000, 390, 500, 20);
    ground8.shapeColor = "green"

    //finish point 
    finishLine1 = createSprite(5050, 390, 10, 500);
    finishLine2 = createSprite(5150, 390, 10, 500);

    //enemys
    enemy1 = createSprite(2050, 350, 40, 40);
    enemy1.shapeColor = "black";
    enemy1.velocityX = -6;

    enemy2 = createSprite(3800, 260, 40, 40);
    enemy2.shapeColor = "black";
    enemy2.velocityY = -8

    //invisible grounds to make the enemy bounce
    invisibleGround = createSprite(1700, 350, 40, 40);
    invisibleGround.visible = false;
    invisibleGround2 = createSprite(2500, 350, 40, 40);
    invisibleGround2.visible = false;
    invisibleGround3 = createSprite(3800, 100, 40, 10);
    invisibleGround3.visible = false;

    //coins
    coin1 = createSprite(1510, 170, 30, 30);
    coin1.shapeColor = "yellow";

    coin2 = createSprite(2800, 360, 30, 30);
    coin2.shapeColor = "yellow";

    coin3 = createSprite(2850, 360, 30, 30);
    coin3.shapeColor = "yellow";

    coin4 = createSprite(2900, 360, 30, 30);
    coin4.shapeColor = "yellow";

    coin5 = createSprite(2950, 360, 30, 30);
    coin5.shapeColor = "yellow";

    coin6 = createSprite(4100, 270, 30, 30);
    coin6.shapeColor = "yellow";

    coin7 = createSprite(4150, 270, 30, 30);
    coin7.shapeColor = "yellow";

    coin8 = createSprite(4200, 270, 30, 30);
    coin8.shapeColor = "yellow";

    coin9 = createSprite(4250, 270, 30, 30);
    coin9.shapeColor = "yellow";

    coin10 = createSprite(4300, 270, 30, 30);
    coin10.shapeColor = "yellow";


}

function draw() {
    background("lightBlue");
    Engine.update(engine);
    ground.display();


    textSize(30);
    stroke("black");
    strokeWeight(3);
    fill("orange");
    text(" SCORE : " + score, ball.x + 260, camera.y - 150);


    if (gameState === PLAY) {

        // to move the ball
        if (keyDown("right")) {
            ball.x = ball.x + 13;
            camera.x = ball.x;
            console.log(ball.x);
        }

        if (keyDown("left")) {
            ball.x = ball.x - 13;
            camera.x = ball.x;

        }

        if (keyDown("space") && ball.y >= 100) {
            ball.velocityY = - 10;
            //console.log(ball.y);
        }
        // to add gravity
        ball.velocityY = ball.velocityY + 1.5

        //to get score
        if (ball.isTouching(coin1)) {
            coin1.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin2)) {
            coin2.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin3)) {
            coin3.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin4)) {
            coin4.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin5)) {
            coin5.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin6)) {
            coin6.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin7)) {
            coin7.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin8)) {
            coin8.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin9)) {
            coin9.destroy();
            score = score + 1;
        }
        if (ball.isTouching(coin10)) {
            coin10.destroy();
            score = score + 1;
        }


        if (ball.isTouching(enemy1)) {
            gameState = END;
        }

        if (ball.isTouching(enemy2)) {
            gameState = END;
        }

    }





    // to make the ball collide with ground
    ball.collide(ground);
    ball.collide(ground2);
    ball.collide(ground3);
    ball.collide(ground4);
    ball.collide(ground5);
    ball.collide(ground6);
    ball.collide(ground7);
    ball.collide(ground8);

    //to make the enemy bounce
    enemy1.bounceOff(invisibleGround);
    enemy1.bounceOff(invisibleGround2);
    enemy2.bounceOff(ground6);
    enemy2.bounceOff(invisibleGround3);

    //to end the game when ball hits enemy

    if (gameState === END) {

        textSize(30);
        fill("red");
        text(" OOPS You Was Hitten By An Enemy", ball.x - 200, camera.y);
        enemy1.velocityX = 0;
        enemy2.velocityY = 0;

    }

    if (ball.isTouching(finishLine2)) {
        gameState = GAMEWON;
    }

    if (gameState === GAMEWON) {
        textSize(50);
        stroke("red");
        strokeWeight(4);
        fill("blue");
        text("YOU WON THE GAME", ball.x - 200, camera.y);

        finishLine2.visible = false;
        finishLine1.visible = false;
    }

    drawSprites();
}



