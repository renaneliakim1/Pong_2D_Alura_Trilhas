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
//y velocidade  do oponente= ySpeedyOpponent
// raquete oponente colisão biblioteca = opponentCollisionRacketLibrary
//verifica colisão raquete = checksRacketCollision

let xBall= 300;
let yBall= 200;
let diameter= 15;
let xSpeedxBall= 2;
let ySpeedyBall= 2;
let ray = diameter / 2;

let xRacket = 5;
let yRacket = 150;

let xOpponentRacket = 585;
let yOpponentRacket = 150;


let ySpeedyOpponent;

let racketLength = 10;
let racketHeight = 100;
let collision = false;
 


function setup (){
  createCanvas(600, 400);
}

function draw (){
  background(50);
  showBall();
  moveBall();
  checkEdgeCollision();
  showRacket(xRacket, yRacket);
  moverRaquete1();
  //checkRacketCollision();
  checksRacketCollision(xRacket,yRacket);
  showRacket(xOpponentRacket, yOpponentRacket);
  moveOpponentRacket();
  checksRacketCollision(xOpponentRacket, yOpponentRacket);
  showOpponentRacket();
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


function moverRaquete1(){
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
  }
};

function checksRacketCollision(x,y){
  collision = 
  collideRectCircle(x, y, racketLength, racketHeight, xBall, yBall, ray);
  if (collision){
    xSpeedxBall *= -1;

  }
}


function moveOpponentRacket(){
  ySpeedyOpponent= yBall - yOpponentRacket - yOpponentRacket - racketLength / 2 -30;
  yOpponentRacket += ySpeedyOpponent;

 
}