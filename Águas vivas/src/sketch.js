// particulas
let partX = [];
let partY = [];
let partR = [];
let partVX = [];
let partVY = [];
let partCor = [];      
let partVida = [];
let partMaxVida = [];
let totalParticulas = 60;

// aguas vivas
let avX = [];
let avY = [];
let avVX = [];
let avVY = [];
let avR = [];
let avFase = [];
let avCor = [];        
let avTentaculos = [];
let avComprTentaculo = [];
let totalAV = 30;

let raio = 40;

function preload(){
  musica = loadSound("assets/mario.mp3");
  fundo = loadImage("assets/fundo2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // inicializa as particulas
  for (let i = 0; i < totalParticulas; i++){
    partX[i] = random(width);
    partY[i] = random(height);
    partR[i] = random(1, 3.5);
    partVX[i] = random(-0.15, 0.15);
    partVY[i] = random(-0.3, 0.1);
    partVida[i] = random(200, 500);
    partMaxVida[i] = partVida[i];
    
    if (random() > 0.5){
      partCor[i] = [80, 220, 180, random(30, 140)];
    } 
    else {
      partCor[i] = [100, 160, 255, random(30, 140)];
    }
  }

  // inicializa as aguas vivas
  for (let i = 0; i < totalAV; i++){
    avX[i] = random(width);
    avY[i] = random(height * 0.85);
    avVX[i] = random(-0.4, 0.4);
    avVY[i] = random(-0.2, 0.2);
    avR[i] = random(20, 40);
    avFase[i] = random(TWO_PI);
    avCor[i] = [random(120, 200), random(80, 150), random(200, 255)];
    avTentaculos[i] = floor(random(4, 6));
    avComprTentaculo[i] = avR[i] * random(1, 2);
  }
}

function draw() {
  
  image(fundo, 0, 0, width, height);
  
  // atualiza as partículas
  for (let i = 0; i < totalParticulas; i++){
    partX[i] += partVX[i];
    partY[i] += partVY[i];
    partVida[i]--;
    
    // reinicia quando a vida chega a 0 ou sai da tela
    if (partVida[i] <= 0 || partY[i] < 0){
      partX[i] = random(width);
      partY[i] = random(height);
      partVida[i] = random(200, 500);
      partMaxVida[i] = partVida[i];
    }
    desenharParticula(i);
  }

  // atualiza as aguas vivas 
  for (let i = 0; i < totalAV; i++){  
    // detecta se o mouse esta perto e foge
    let distancia = dist(mouseX, mouseY, avX[i], avY[i]);
    if (distancia < raio){
      let angulo = atan2(avY[i] - mouseY, avX[i] - mouseX);
      avVX[i] = cos(angulo) * 6;
      avVY[i] = sin(angulo) * 6;
    }
    
    // movimento
    avX[i] += avVX[i];
    avY[i] += avVY[i];
    
    // bater nas bordas
    if (avX[i] >= width - raio){
      avX[i] = width - raio; 
      avVX[i] *= -1.02;      
    }
    
    if(avX[i] <= raio){
      avX[i] = raio;         
      avVX[i] *= -1.02;
    }
    
    if (avY[i] >= height - raio){
      avY[i] = height - raio; 
      avVY[i] *= -1.02;
    } 
    
    if (avY[i] <= raio){
      avY[i] = raio;         
      avVY[i] *= -1.02;
    }
    
    // desacelerar velocidade
    avVX[i] *= 0.97;
    avVY[i] *= 0.97;
    
    // movimento ondulante
    avVY[i] += sin(frameCount * 0.015 + avFase[i]) * 0.03;
    avVX[i] += cos(frameCount * 0.012 + avFase[i]) * 0.02;

    desenharAguaViva(i);
  }
}

function desenharParticula(i){
  
  let sumir = partVida[i] / partMaxVida[i];
  let c = partCor[i];
  
  noStroke();
  fill(c[0], c[1], c[2], c[3] * sumir);
  circle(partX[i], partY[i], partR[i] * 2);

  fill(c[0], c[1], c[2], c[3] * sumir * 0.2);
  circle(partX[i], partY[i], partR[i] * 5);
}

function desenharAguaViva(i){
  let c = avCor[i];
  
  // cabeça
  fill(c[0], c[1], c[2]);
  noStroke();
  arc(avX[i], avY[i], avR[i] * 2, avR[i] * 1.5, PI, TWO_PI);
  
  // tentaculos
  stroke(c[0], c[1], c[2]);
  strokeWeight(1.2);
  noFill();

  for (let j = 0; j < avTentaculos[i]; j++){
    // angulação dos tentaculos
    let angBase = map(j, 0, avTentaculos[i], -PI * 0.4, PI * 0.4) + PI / 2;
    // movimento de nado onda
    let ondaT = sin(frameCount * 0.06 + avFase[i]) * 10;
    // comprimento
    let comp = avComprTentaculo[i] * (0.8 + sin(avFase[i] + j) * 0.2);

    let xAnterior = avX[i];
    let yAnterior = avY[i];
    
    // desenhando os tentaculos
    for (let t = 0.2; t <= 1; t += 0.2){
      let tx = avX[i] + cos(angBase) * comp * t + sin(t * PI + j + avFase[i]) * ondaT * t;
      let ty = avY[i] + sin(angBase) * comp * t + cos(t * PI + j + avFase[i]) * ondaT * t;
      
      line(xAnterior, yAnterior, tx, ty);
      xAnterior = tx;
      yAnterior = ty;
    }
  }
}

function mouseClicked(){
    if (!musica.isPlaying()){
        musica.setVolume(0.1);
        musica.loop();
    }
}