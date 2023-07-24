//variables Ball
let xBall = 300;
let yBall = 200;
let diameter = 13;
let radius = diameter /2;

//variables racket
let xRacket = 5;
let yRacket = 150;
let wRacket = 10
let hRacket = 90

//variables foe
let xFoeRacket = 585;
let yFoeRacket = 150;
let speedyFoe;

let collided = false;

// game score
let myScore = 0;
let foeScore = 0;

// game sounds
let slam;
let score;
let soundtrack;

//speed Ball
let speedxBall = 6
let speedyBall = 6

function preload () {
  soundtrack = loadSound ("trilha.mp3");
  score = loadSound ("ponto.mp3");
  slam = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop ();
}

function draw() {
  background(0);
  showBall ();
  moveBall ();
  verifyColisionBorder();
  showRacket (xRacket, yRacket);
  moveMyRacket ();
  //verifyMyRacketColision ();
  verifyRacketCollision (xRacket, yRacket);
  showRacket (xFoeRacket, yFoeRacket);
  moveFoeRacket ();
  verifyRacketCollision (xFoeRacket, yFoeRacket);
  includeScore ();
  scoreCount ();
}

function showBall () {
  circle (xBall, yBall, diameter)
}

function moveBall () {
  xBall += speedxBall;
  yBall += speedyBall;
}

function verifyColisionBorder () {
  if (xBall + radius > width ||
     xBall - radius < 0){
    speedxBall *= -1;
  }
  
  if (yBall + radius> height ||
     yBall - radius < 0) {
    speedyBall *= -1;
  }
}

function showRacket (x, y) {
  rect(x, y, wRacket, hRacket);
}


function moveMyRacket () {
  if (keyIsDown (87)){
    yRacket -= 10;
  }
   if (keyIsDown (83)){
    yRacket += 10;
  }
}

function verifyMyRacketColision () {
  if (xBall - radius < xRacket + wRacket
     && yBall - radius < yRacket + hRacket && 
     yBall + radius > yRacket) {
    speedxBall *= -1;
    slam.play ();
  }
}

function verifyRacketCollision (x, y) {
  collided =
  collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, radius);
  if (collided) {
    speedxBall *= -1;
    slam.play ();
  }
}


function moveFoeRacket () {
    if (keyIsDown (UP_ARROW)){
    yFoeRacket -= 10;
  }
   if (keyIsDown (DOWN_ARROW)){
    yFoeRacket += 10;
  }
}

function includeScore () {
  stroke (255);
  textAlign (CENTER);
  textSize (18);
  fill (color (128, 0, 128));
  rect (150, 10, 40, 20)
  fill (255);
  text (myScore, 170, 26);
  fill (color (128, 0, 128));
  rect (450, 10, 40, 20);
  fill (255);
  text (foeScore, 470, 26)
}

function scoreCount () {
  if (xBall > 590 ) {
    myScore += 1;
    score.play();
  }
  if (xBall < 10) {
    foeScore += 1;
    score.play();
  }

}