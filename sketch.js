// protugues | ingles
// bola = Ball
//diametro= diameter
//raio = ray
//mostrar bola = showBall
//movimentar bola = moveBall
//raquete = Racket
//mostrar raquete =show racket
//verificar colisão borda = checkEdgeCollision
//verifique colisão com raquete = checkRacketCollision
//raquete colisão biblioteca = libraryCollisionRacket
//colisão =  collision
//mover raquete oponente = moveOpponentRacket
//y velocidade  do oponente= ySpeedOpponent
// raquete oponente colisão biblioteca = opponentCollisionRacketLibrary
//verifica colisão raquete = checksRacketCollision
// pontos = score
//pontuação oponente= opponentScore
//placar = scoreboard


let xBall = 300;
let yBall = 200;
let diameter = 12;
let xSpeedxBall = 8;
let ySpeedyBall = 8;
let ray = diameter / 2;

let xRacket = 5;
let yRacket = 150;

let xOpponentRacket = 585;
let yOpponentRacket = 150;

let racketLength = 10;
let racketHeight = 100;

let score = 0;
let opponentScore = 0;

let racketSound;
let soundTrack;
let dotSound;
let cheer;

let timeLeft = 60; 

let start = false;
let timerStarted = false;

function preload() {
  soundTrack = loadSound("/PongSons/Track.mp3");
  racketSound = loadSound("/PongSons/Racket.mp3");
  dotSound = loadSound("/PongSons/Point.mp3");
  cheer = loadSound("/PongSons/Cheer.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundTrack.loop();
}

function draw() {
  background(50, 150);
 
  if (start && !timerStarted) { // Checks if the game has started and if the timer has not started yet
    startTimer(); // Starts the timer only once
    timerStarted = true; // Defines that the timer has started
  }

  if (start && timeLeft > 0) { // Checks if the game has started and if there is still time remaining
    showBall();
    moveBall();
    checkEdgeCollision();
    showRacket(xRacket, yRacket);
    moveRacket1();
    showRacket(xOpponentRacket, yOpponentRacket);
    moveOpponentRacket();
    checksRacketCollision(xRacket, yRacket, racketLength, racketHeight);
    checksRacketCollision(xOpponentRacket, yOpponentRacket, racketLength, racketHeight);
    scoreboard();
    deeppointCount();
  } else if (!start) { 
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(20);

    text("use w/s/up/down to start the game.", width / 2, height / 2);
  } else { 
    gameOver();
  }
}

function keyPressed() {
  if (!start) {
    start = true;
  }
}

function startTimer() {
  setInterval(() => { // Usamos setInterval para chamar a função a cada segundo
    if (timeLeft > 0) {
      timeLeft--; 
    }
  }, 1000); // Intervalo de 1 segundo
}

function showBall() {
  circle(xBall, yBall, diameter);
}

function moveBall() {
  xBall += xSpeedxBall;
  yBall += ySpeedyBall;
}

function checkEdgeCollision() {
  if (xBall + ray > width || xBall - ray < 0) {
    xSpeedxBall *= -1;
  }
  if (yBall + ray > height || yBall - ray < 0) {
    ySpeedyBall *= -1;
  }
}

function showRacket(x, y) {
  rect(x, y, racketLength, racketHeight);
}

function moveRacket1() {
  if (keyIsDown(87)) {
    yRacket -= 10;
  }
  if (keyIsDown(83)) {
    yRacket += 10;
  }
}

function checksRacketCollision(x, y, width, height) {
  if (
    xBall - ray < x + width &&
    xBall + ray > x &&
    yBall - ray < y + height &&
    yBall + ray > y
  ) {
    xSpeedxBall *= -1;
    racketSound.play();
  }
}



function checksRacketCollision(x,y) {
  collision = collideRectCircle(x, y, racketLength, racketHeight,xBall,yBall,ray);
  if (collision) {
    xSpeedxBall *= -1;
    racketSound.play();
  }
}  






function moveOpponentRacket() {
  if (keyIsDown(UP_ARROW)) {
    yOpponentRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yOpponentRacket += 10;
  }
}

function scoreboard() {
  stroke(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(200, 10, 40, 20);
  fill(255);
  text(score, 220, 20);
  fill(color(255, 140, 0));
  rect(360, 10, 40, 20);
  fill(255);
  text(opponentScore, 380, 20);

  strokeWeight(2);
  stroke(255, 165, 0);
  line(300, 30, 300, 400);
  stroke(173, 216, 230);
  textSize(14);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  text("Time left: " + timeLeft, width / 2, 20);
  stroke(255, 165, 0);
}

function deeppointCount() {
  if (xBall > 590 && xBall < 610) {
    score += 1;
    dotSound.play();
  }
  if (xBall < 10 && xBall > 0) {
    opponentScore += 1;
    dotSound.play();
  }
}

function gameOver() {
  cheer.play();

  noLoop();
  swal({
    title: "Game Over! Time Sold out",
    text: ("Final Score    " + score + " x " + opponentScore),
    icon: "success",
    button: "Reload to play again! :)",

  }).then(() => {
    location.reload();

  });
}
