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


let xBall= 300;
let yBall= 200;
let diameter= 12;
let xSpeedxBall= 8;
let ySpeedyBall= 8;
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


function preload(){
  soundTrack = loadSound("/Pong-Sons/Track.mp3");
  racketSound = loadSound("/Pong-Sons/Racket.mp3");
  dotSound = loadSound("/Pong-Sons/Point.mp3");


};


function setup (){
  createCanvas(600, 400);
  soundTrack.loop();
}

function draw (){
  background(50);
  showBall();
  moveBall();
  checkEdgeCollision();
  showRacket(xRacket, yRacket);
  moveRacket1();
  checkRacketCollision();
  checksRacketCollision(xRacket,yRacket);
  showRacket(xOpponentRacket, yOpponentRacket);
  moveOpponentRacket();
  checksRacketCollision(xOpponentRacket, yOpponentRacket);
  showOpponentRacket();
  scoreboard();
  deeppointCount();




}

function showBall(){
  circle (xBall, yBall, diameter);

}

function moveBall(){
  xBall +=  xSpeedxBall;
  yBall +=  ySpeedyBall;
}

function checkEdgeCollision(){
  if(xBall + ray > width || xBall - ray  < 0){
    xSpeedxBall *= -1;
  }
  if (yBall + ray > height || yBall  - ray < 0){
    ySpeedyBall *= -1;
  }
}

function showOpponentRacket(){
  rect (xOpponentRacket,yOpponentRacket,racketLength,racketHeight)
};

function showRacket(x,y){
  rect (x, y ,racketLength,racketHeight)
};


function moveRacket1(){
  if (keyIsDown(UP_ARROW)){       // write the same js documentation
    yRacket -= 10;
  };

  if (keyIsDown(DOWN_ARROW)){       // write the same js documentation
    yRacket += 10;
  };
}

function checkRacketCollision(){
  if(xBall - ray < xRacket + racketLength && yBall - ray < yRacket + racketHeight && yBall + ray > yRacket){
    xSpeedxBall *= -1;
    t
  }
};

function checksRacketCollision(x,y){
  collision = 
  collideRectCircle(x, y, racketLength, racketHeight, xBall, yBall, ray);
  if (collision){
    xSpeedxBall *= -1;
    racketSound.play();
  }
}


function moveOpponentRacket(){
  ySpeedOpponent= yBall - yOpponentRacket - racketLength / 2 -30;
  yOpponentRacket += ySpeedOpponent;
  racketSound.play();

 
}

function scoreboard(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(200, 10, 40, 20);
  fill(255);
  text(score, 220 , 26);
  fill(color(255,140,0));
  rect(400, 10, 40, 20);
  fill(255);
  text(opponentScore,  420, 26);

}

function deeppointCount(){
  if( xBall > 590){
    score += 1;
    dotSound.play();
  }
  if(xBall< 10){
    opponentScore += 1;
    dotSound.play();
  }
};

