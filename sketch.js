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

let ySpeedOpponent;

let racketLength = 10;
let racketHeight = 100;
let collision = false;

let score = 0;
let opponentScore = 0;

let racketSound;
let soundTrack;
let dotSound;

let timeLeft = 60;

function preload() {
  soundTrack = loadSound("/PongSons/Track.mp3");
  racketSound = loadSound("/PongSons/Racket.mp3");
  dotSound = loadSound("/PongSons/Point.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundTrack.loop();
  startTimer();
}

function draw() {
  background(50, 80);
  strokeWeight(2);
  stroke(255, 165, 0);
  line(300, 0, 300, 400);

  stroke(173, 216, 230);

  textSize(14);
  fill(255);
  textAlign(CENTER);
  text("Time left  : " + timeLeft, width / 2, 20);
  stroke(255, 165, 0);

  showBall();
  moveBall();
  checkEdgeCollision();
  showRacket(xRacket, yRacket);
  moveRacket1();
  showRacket(xOpponentRacket, yOpponentRacket);
  moveOpponentRacket();
 
  checksRacketCollision(xRacket, yRacket, racketLength, racketHeight);
  checksRacketCollision(xOpponentRacket,yOpponentRacket,racketLength,racketHeight);

  scoreboard();
  deeppointCount();





}

function startTimer() {
  setTimeout(() => {
    timeLeft--; // Reduces remaining time by 1 second
    if (timeLeft > 0) {
      startTimer(); // Call the function again after 1 second
    } else {
      gameOver(); //Calls the function to end the game when time runs out
    }
  }, 1000); // 1000 milliseconds = 1 second
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
  if (keyIsDown(UP_ARROW)) {
    // write the same js documentation
    yRacket -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    // write the same js documentation
    yRacket += 10;
  }
}

  function checksRacketCollision() {
  if (
    xBall - ray < xRacket + racketLength &&
    yBall - ray < yRacket + racketHeight &&
    yBall + ray > yRacket
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
  if (keyIsDown(87)) {
    // write the same js documentation
    yOpponentRacket -= 10;
  }

  if (keyIsDown(83)) {
    // write the same js documentation
    yOpponentRacket += 10;
  }
}


function verificaColisaoBorda(){
  if (xBall + ray> width 
     (xBall - ray< 0)){
    xSpeedxBall *= -1;
  }
  if (yBall + ray> height 
     (yBall - ray < 0)){
      ySpeedxBall *= -1;
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
  swal({
    title: "Game over!",
    text: "Time Sold out",
    icon: "success",
    button: "Reload to play again! :)",
  });
}
