let susto, grito;
let ativouSusto = false;
let jogando = false;
let playerX = 0;
let playerY = 0;

function preload(){
  susto = loadImage("../assets/susto.jpg");
  grito = loadSound("../assets/grito.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetar();
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  rect(50, 300, 250, 50);
  rect(250, 40, 50, 300);

  fill(255, 0, 0);
  rect(260, 50, 30, 30);

  fill(0, 0, 255);
  rect(playerX, playerY, 10, 10);

  if (jogando) {
    playerX = mouseX;
    playerY = mouseY;
  }

  if (!jogando && mouseX > 60 && mouseX < 90 && mouseY > 310 && mouseY < 340) {
    jogando = true;
  }

  if (jogando && !dentroDoCaminho(playerX, playerY)) {
    resetar();
  }

  if (jogando && playerX > 260 && playerX < 290 && playerY > 50 && playerY < 80) {
    ativouSusto = true;
    grito.play();
    grito.loop();
    jogando = false;
  }

  if (ativouSusto) {
    image(susto, 0, 0, width, height);
  }
}

function dentroDoCaminho(x, y) {
  let noCaminho1 = (x > 50 && x < 300 && y > 300 && y < 350);
  let noCaminho2 = (x > 250 && x < 300 && y > 40 && y < 350);

  return noCaminho1 || noCaminho2;
}

function resetar() {
  jogando = false;
  ativouSusto = false;

  playerX = 65;
  playerY = 315;

  if (grito.isPlaying()) {
    grito.stop();
  }
}

function mouseClicked() {
  if (ativouSusto){
    resetar();
  }
}
